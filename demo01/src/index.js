import avatar from './avatar.jpg';
import style from './index.scss'; // 使用css模块化，style仅作用于当前文件，不会与其他css文件冲突(低耦合)
import createAvatar from './createAvatar';

createAvatar();

var img = new Image();
img.src = avatar;
img.classList.add(style.avatar);

var root = document.getElementById('root');
root.append(img);