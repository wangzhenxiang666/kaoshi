$(function(){
 
    let cart = JSON.parse( window.localStorage.getItem("cart"))|| []
    console.log(cart)
     bindHtml()
    function bindHtml(){
         let str=''
         let str2 =''
          let flag = 0
         let flag2 = 0
       cart.forEach((item,index) =>{
           if(item.is_select==0){
             flag++
             str+=`
             <li>
             <input type="checkbox"  data-id="${item.todo_id}"/>
             <p data-id="${item.todo_id}">${item.info}</p>
             <a data-id="${item.todo_id}">-</a>
             </li>`
           }
           if(item.is_select==1){
             flag2++
             str2+=`
             <li>
             <input type="checkbox" checked  data-id="${item.todo_id}"/>
             <p data-id="${item.todo_id}">${item.info}</p>
             <a data-id="${item.todo_id}">-</a>
             </li>`
           }
       })
       $("#todolist").html(str)
       $("#todocount").html(flag)
       $("#donelist").html(str2)
       $("#donecount").html(flag2)
     }



// const nameInp=document.querySelector('li>input')
//      nameInp.onkeydown = function (e) {
//         const cart = JSON.parse(window.localStorage.getItem('cart')) || []    
//     e=e||window.event
//     var code=e.keyCode||e.which
//     var name = nameInp.value
//     name.trim()
   
//     // if (!name) {
//     //     alert('请完整填写表单')
//     //     return
//     // }
//     if(code==13){
//         let cee=`
        
//         `
//         str+=`
//         <li>
//             <input type="checkbox" />
//                 <p onclick="edit(1)">${name}</p>
//                 <a href="javascript:remove(1)">-</a>
//             </li>
//         `
//     }
//     $('ol').html(str)
//     window.localStorage.setItem('cart', JSON.stringify(cart))
//     nameInp.value=''
//     bind()
//     console.log(res)

//   }
//             }
 
 
     $('form').on("keydown",'#title',function(e){
         console.log($(this).attr('data-id'))
       if(!$(this).attr('data-id')){
            if(e.keyCode==13){
             const obj ={
                 "is_select":0,
                  "todo_id": cart.length? cart[cart.length-1].todo_id-0+1:1 ,
                  "info": $(this).val().trim()
             }
             cart.push(obj)
             $(this).val(" ")
             window.localStorage.setItem("cart",JSON.stringify(cart))
             bindHtml()
         }
       }else{
           if(e.keyCode==13){
             cart.forEach((item,index)=>{
             if(item.todo_id == $(this).attr('data-id')){
                 item.info =$(this).val().trim()
                 return
                
             }
         })
          this.removeAttribute("data-id")
          $(this).val(" ")
          window.localStorage.setItem("cart",JSON.stringify(cart))
          bindHtml()
           }
        
       }
        
     } )
     $(".demo-box").on("click","li>a", function(){ 
         cart.forEach((item,index)=>{
             if(item.todo_id == $(this).attr('data-id')){
                 cart.splice(index,1)
                 return
                
             }
         })
      window.localStorage.setItem("cart",JSON.stringify(cart))
      bindHtml()
 
     })
 
     $(".demo-box").on('click',"li >input",function(){
        console.log(this.checked) 
        cart.forEach((item,index)=>{
         if(item.todo_id == $(this).attr('data-id')){
             item.is_select = this.checked ? 1:0;
             return
         }
     })
     console.log(cart)
     window.localStorage.setItem("cart",JSON.stringify(cart))
     bindHtml()
     
 })
    $(".demo-box").on('click','p',function () {
         $("#title").attr('data-id', $(this).attr('data-id'))
    })
     
 })