import * as firebase from "firebase/compat";
import config from '../../firebase.json';

const app = firebase.initializeApp(config);

const Auth = app.auth();

export const login = async ({ email, password }) => {
    const {user} = await Auth.signInWithEmailAndPassword(email,password);
    return user;
}

export const signup = async ({email, password, name, photoUrl }) => {
    const {user} = await Auth.createUserWithEmailAndPassword(email, password);
    //https의 여부에 따라서 있으면 사용자가 사진을 선택하지 않고 진행한 경우 이므로, (https://firebase)로 시작하고
    //선택한 경우에는 (file://) 로 시작하므로 https의 여부에 따라서 있으면 기본 이미지, 없으면 upload를 한다.
    const storageUrl = photoUrl.startsWith('https')
        ? photoUrl
        : await uploadImage(photoUrl);
        await user.updateProfile({
            displayName: name,
            photoURL: storageUrl,
        });
    return user;
};
/**
 *
 * @param uri
 * @returns {Promise<*>}
 * 업로드는 promise를 만들어 사용한다.
 */
const uploadImage = async uri => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const user = Auth.currentUser;
    const ref = app.storage().ref(`/profile/${user.uid}/photo.png`);
    const snapshot = await ref.put(blob, {contentType:'image/png' });
    console.log('snapshot', snapshot);
    blob.close();
    return await snapshot.ref.getDownloadURL();
};


export const logout = async () => {
    return await Auth.signOut();
}

export const getCurrentUser =  () => {
    const {uid, displayName, photoURL} = Auth.currentUser;
    return {uid, name: displayName, email, photoURL: photoURL};
};

export const updateUserPhoto = async photoUrl => {
    const user = Auth.currentUser;
    const storageUrl = photoUrl.startsWith('https')
        ? photoUrl
        : await uploadImage(photoUrl);
    await user.updateProfile({photoURL : storageUrl });
    return { name: user.displayName, email:user.email, photoUrl: user.photoUrl };
}
