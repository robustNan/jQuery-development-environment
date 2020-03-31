import 'bootstrap';

import 'bootstrap/scss/bootstrap.scss';
import '../style/index.sass';
import displayState from './demoPage/display';

console.warn(`mode is: ${process.env.NODE_ENV}`);
console.warn(displayState); //引入并打印是为了测试共同引用模块的打包
