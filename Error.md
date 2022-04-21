
## None of these files exist 
- Inext.js의 역할은 Image, Input을 임포트하여 다시 export를 한다. Login.js에서 <br>
<code> import {Input, Image} from '../components' </code> import 하였지만 none of these files exist 에러가 발생했다.
Index.js 대문자이므로 발생한 에러이다. default => import시 파일명이 index.js이면 생략가능 대문자이므로 파일을 못찾았기 때문에 해당 에러 발생.
