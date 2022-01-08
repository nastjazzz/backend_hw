// import b from './app/first';
import './app/second';
import './app/third';

// document.write(b);

// для таких импортов создаются отдельные чанки, которые по мере необходимости можно подключать к странице
// надо не забывать их подключать!
// почему разные имена у таких файлов? от чего зависят?
import('./app/first.js').then((obj) => console.log(obj, obj.b, obj.default));

// подключается css в js-файле и с помощью webpack подтягиваются на страницу
// import './style.scss';
