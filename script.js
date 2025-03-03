// function which will run so that front end fetch the required data to show
import {mthd} from './api_testing_website_data.js';
let data=mthd.data;
async function process(){
    let afterHeading1=document.getElementById('afterHeading1');
    let afterHeading2=document.getElementById('afterHeading2');
    let afterHeading3=document.getElementById('afterHeading3');
    // let rurl= await fetch('https://server-link.onrender.com/link');
    // rurl=await rurl.text();
    // let data= await fetch(`${rurl}api/websiteData`);
    // data=await data.json();

    // rurl=await rurl.stringify();
    // console.log("type= ",typeof rurl, "data= ",rurl);
    data.forEach(obj => {
        let div=document.createElement('div');
        afterHeading1.append(div);

        div.className='divis';
        div.style.display='flex';
        div.style.justifyContent='space-between';
        let childDiv1=document.createElement('div');
        childDiv1.className='divis1';
        childDiv1.innerHTML=  `<h9>${obj.method_name}</h9>`;
        childDiv1.style.background='grey';
        childDiv1.style.color='white';
        // childDiv1.style.border = '1px solid black';
        let childDiv2=document.createElement('div');
        childDiv2.className='divis2';
        childDiv2.innerHTML=  `<h8>${obj.method_description}</h8>`;
        childDiv1.style.color='black';
        childDiv2.style.background='white';

        div.append(childDiv1);
        div.append(childDiv2);


        // adding the click event listner which will write the frontend data in 
        // other two clms
        div.addEventListener('click',()=>{
            // let data=JSON.
            let damData=(obj.response_body[0]);
            console.log(damData);
            
            afterHeading3.innerHTML = `<pre style="background: #87CEEB; padding: 10px; border-radius: 5px;">${JSON.stringify(damData, null, 2)}</pre>`;
            let reqUrl=document.getElementById('reqUrl2');
            reqUrl.innerHTML = `<pre style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${obj.response_code}</pre>`;
        
        });
        div.addEventListener('click',()=>{
            // let data=JSON.
            let damData=(obj.request_body);
            console.log(damData);
            afterHeading2.innerHTML = `<pre style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${JSON.stringify(damData, null, 2)}</pre>`;
            let reqUrl=document.getElementById('reqUrl');
            reqUrl.innerHTML = `<pre style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${obj.request_path}</pre>`;

        });

    });

}
process();