$(function(){
    var tdata=[];
    var ind;


    //Появление стандартных задач
    $('ul.menu').hide().fadeIn(2000);
   
    // Вывод локального хранилища
    console.log(localStorage.getItem('tdata'));
    
    //Если в локальном хранилище есть данные
    if(localStorage.getItem('tdata')!==null){
        //Читаем элементы хранилища
        tdata=JSON.parse(localStorage.getItem('tdata'));
        //Выводим количество элементов в консоль
        console.log(tdata.length);
        //Цикл по элементам хранилища
        for(var i=0;i<tdata.length;i++){
            //Создаем элементы при загрузке страницы согласно именам локального хранилища
            var $newItem=$('<li class="vote">'+tdata[i]+'<a href="#"><img src="images/arrow.png" alt=""></a>'+'</li>').hide().fadeIn(1000); 
            
            //Если задач больше одной, то новую добавляем в конец
            if($('li.vote').length>0){
                $('li.vote:last').after($newItem);
            } 
            //Если задач нет, то создаем новое меню с новой задачей перед кнопкой
            else {
                //ссылаемся на главное меню
                var nMenu=$('<ul class="menu"></ul>');
                //Вставляем перед кнопкой
                $('div.main').before(nMenu);
                //После открывающегося тега вставляем элемент
                $(nMenu).prepend($newItem);
            }
        }
    }

    //Добавить новую задачу
    
        //Получаем информацию о новой задаче
        $('button.addT').on('click',function(event){
            // event.preventDefault();

            var $text=$('input.inpM').val();
             //Процесс создания элемента
             //Если текст существует
             if($text!=undefined){
                //Создаем новый элемент с новым текстом
                var $newItem=$('<li class="vote">'+$text+'<a href="#"><img src="images/arrow.png" alt=""></a>'+'</li>').hide().fadeIn(1000); 
              
                //вставляем текст в конец строкового массива
                tdata.push($text);
                //сохраняем в локальном хранилище
                localStorage.setItem('tdata',JSON.stringify(tdata));
            }
            //Если задач больше одной, то новую добавляем в конец
            if($('li.vote').length>0){
                $('li.vote:last').after($newItem);
            } 
            //Если задач нет, то создаем новое меню с новой задачей перед кнопкой
            else {
                var nMenu=$('<ul class="menu"></ul>');
                $('div.main').before(nMenu);
                $(nMenu).prepend($newItem);
            }
        })
          
   

    //Задача выполнена
    //При удалении задачи используем анимацию сокрытия
    $(document).on('click','li.vote',function(){
        $(this).animate({
            opacity:0.0},500,function(){
                //в консоль вывожу удаленный элемент
                console.log($(this).text()+"удален!");
                //удаляем элемент
                $(this).remove(); 
                //получаем локальное хранилище
                tdata=JSON.parse(localStorage.getItem('tdata'));
                //сохраняем текст удаляемого элемента
                var del=$(this).text();
                //получаем по тексту индекс элемента массива
                ind=tdata.indexOf(del);
                //Удаляем посредством функции splice 
                    if(ind>-1){
                        tdata.splice(ind,1);
                        //Заного проводим инициализацию хранилища с оставшимися элементами
                        localStorage.setItem('tdata',JSON.stringify(tdata));
                    }
            })
    })

})