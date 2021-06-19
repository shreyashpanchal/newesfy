import React,{useState,useEffect} from "react";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import firebase from './firebase';
import './App.css';

function App() {
  const [imgfile,setFile]=useState(null);
  const [getArticlesdata,getArticles]=useState([]);
  const [a,sa]=useState("");
  const [storagess,gg]=useState("");
 const [getStoriesdata,getStories]=useState([]);
  const [s,ss]=useState([]);
  const [pr1,setpr1]=useState("none");
  const [pr2,setpr2]=useState("none");
  const [pr3,setpr3]=useState("none");
  const [p,setp]=useState(0);
  const [p2,setp2]=useState(10);
  const [p1,setp1]=useState(0);
  const [dp1,setdp1]=useState("none");
  const [dp2,setdp2]=useState("none");
  const [imgstories,setStories]=useState([]);
  const [url,seturl]=useState([]);
  const [booleanUploadData,setBoolUploadData]=useState("none");
  const [booleanUpload,setBoolUpload]=useState("block");
  const [VideoTitle,setVideoTitle]=useState("");
  const [file,setfile]=useState();
  const [ArticleTitleValue,setArticleTitleValue]=useState("")
  const [ArticleDescriptionValue,setArticleDescriptionValue]=useState("")
  const [StoriesTitleValue,setStoriesTitleValue]=useState("");
  

  useEffect(() => {
   const db=firebase.firestore();
   db.collection("articles").orderBy("startedAt","desc").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const id=doc.id;
      const name=doc.data().title;
      const desc=doc.data().desc;
      const img=doc.data().imgUrl;
      const object={id,name,desc,img};
     
      getArticles((prev)=>[...prev,object]);
    });
     
   
});
db.collection("stories").orderBy("startedAt","desc").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const id2=doc.id;
    const storytitle78=doc.data().title;
   const imgsr=doc.data().imgUrl;
  
    //const img=doc.data().imgUrl;
   const object={id2,storytitle78,imgsr};
  // console.log(doc.data().imgUrl)
   getStories((prev)=>[...prev,object]);
  });
   
 
});

    
  },[])
  
  const ok=async(e)=>{
    e.preventDefault();
 setpr3("block");
  const api="nj4CjrgHGJlcZumtdNmDCUR560c98b1d";
  const body1 = new FormData()
  body1.append("file",file)
  body1.append("", "\\")
  let urlvideo;
  setp2((p)=>30);
 await fetch("https://muse.ai/api/files/upload", {
    body:body1,
   
    headers: {
    
      Key: api
    },
    method: 'POST'
  }).then((response) =>{
  setp2((P)=>65)
  
 return response.json()})
  .then((result) => {
    console.log(result);
    urlvideo=result.url;
      urlvideo=urlvideo.replace('data','videos/hls.m3u8')
    setp2((P)=>80)
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  setp2((P)=>90)
  const db=firebase.firestore();
  db.collection("videos").add({
    bookmarkBy:[],
    title:VideoTitle,
    videoUrl:urlvideo,
    startedAt:firebase.firestore.FieldValue.serverTimestamp()
  })
  setp2((P)=>100)
  setpr3("none");
  setVideoTitle("");
  alert("Video is Successfully Uploaded")
    }



  

  const ArticleFileHandler=(e)=>{
setFile(e.target.files[0]);
     if(e.target.files[0]===undefined){
 console.log("select some files")
 setdp1("none");
     }
     else{
const ap=URL.createObjectURL(e.target.files[0]);

setdp1("block")
   sa(ap);}
  }
  const StoriesFileHandler=(e)=>{
    if(e.target.files.length===0)
    {
      setdp2("none")
     
    }
    else{
    let ij;
    const ap=[];
    
    for(ij=0;ij<e.target.files.length;ij++)
    {
      const apk= URL.createObjectURL(e.target.files[ij]);
      ap.push(apk);
    const newImage=e.target.files[ij];
    setStories((prev)=>[...prev,newImage]);

    }
 
   
    setdp2("block")
       ss(ap);
  }
      }
  const stitlehandler=(e)=>{
    setStoriesTitleValue(e.target.value);
       
      }
  const titlehandler=(e)=>{
    setArticleTitleValue(e.target.value);
       
      }
      const descriptionhandler=(e)=>{
        setArticleDescriptionValue(e.target.value);
           
          }
          

          const stories=(e)=>{
   setpr2("block");
            e.preventDefault();
            const storage=firebase.storage();
            const db=firebase.firestore();
            let cnt=0;
            db.collection("stories")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           cnt++; 
        });
        let count=(cnt+1).toString();
        gg((prev)=>count);
    // let imglnt=(imgstories.length)-1;
        const promises=[];
        //let urls=[];
           // eslint-disable-next-line array-callback-return
           imgstories.map((image,index)=>{
       
             const upload=storage.ref(`Stories/s${count}/${image.name}`).put(image);
             promises.push(upload);
             upload.on("state_changed",
         (snapshot) => {
           let progress=(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           setp1((prw)=>progress);
         }, 
         (error) => {}, 
         async() => {
          await storage.ref(`Stories/s${count}`).child(image.name).getDownloadURL()
          .then((downloadURL) => { 
          
          seturl((prev)=>[...prev,downloadURL]);
          });
         }
       ); 
           })  
           Promise.all(promises).then(()=>{    
           setBoolUploadData("block");
          setBoolUpload("none");
          setdp2("none");
          setpr2("none");
             setStories((prev)=>[]);
             }).catch((err)=>{console.log("Error")});
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });++
          }

  const articles=(e)=>{
    setpr1("block");
    e.preventDefault();
let f;
    const storage=firebase.storage();
    const upload=storage.ref(`Articles/${imgfile.name}`).put(imgfile);

upload.on("state_changed",
  (snapshot) => {
    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setp((prv)=>progress);
  }, 
  (error) => {}, 
  () => {
    storage.ref('Articles').child(imgfile.name).getDownloadURL().then((downloadURL) => { 
    f=downloadURL;
      const db=firebase.firestore();

      db.collection("articles").add({
        bookmarkBy:[],
       desc:ArticleDescriptionValue,
       imgUrl:f,
       title:ArticleTitleValue,
       startedAt:firebase.firestore.FieldValue.serverTimestamp()

      })
      setdp1("none");
      setpr1("none");
      setArticleDescriptionValue("");
      setArticleTitleValue("");
     
      alert("Article Successfully Uploaded")
    });
  }
);



}
const data=(e)=>{
  e.preventDefault();
  const db=firebase.firestore();
 console.log(url);
  db.collection("stories").add({
    bookmarkBy:[],
    title:StoriesTitleValue,
    imgUrl:url,
    startedAt:firebase.firestore.FieldValue.serverTimestamp(),
    sid:storagess
   })
  
   setBoolUploadData("none");
   seturl((prev)=>[]);
 setBoolUpload("block")
  
  alert("Stories Successfully Uploaded")
}
  return (
    <>

<div className="nav-bar">
  <h1>Dashboard</h1>
</div>
<h1>Upload Data</h1>
<div className='forms'>
<div className="articles">
      <h2>Articles</h2>
      <form onSubmit={articles}>
       
            <div><textarea id="at" placeholder="Article Title" required value={ArticleTitleValue} onChange={titlehandler}></textarea></div>
            <div> <textarea id="adt" placeholder="Description" required value={ArticleDescriptionValue} onChange={descriptionhandler}></textarea></div>
            <div>
           
              <input id="af" required type="file" name="file" onChange={ArticleFileHandler}/>
             
              </div>
              <progress style={{display:pr1}} value={p} max="100">0%</progress>
         <div style={{display:dp1}}>
          <h3 style={{textAlign:"center"}}>Preview</h3>
          <div id="aimg"><img src={a}/></div>
          </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><button className="btn-grad5">Upload Article</button></div>
      </form>
    </div>
   
    <div className="storiesnews">
      <h2>Stories</h2>
    <form onSubmit={stories}>
           
    <div> <textarea id="st" placeholder="Title" required value={StoriesTitleValue} onChange={stitlehandler}></textarea></div>
    <div>  <input id="sf" required type="file"  multiple name="file" onChange={StoriesFileHandler}/></div>
    <progress style={{display:pr2}} value={p1} max="100">0%</progress>
    <div style={{display:dp2}}>
          <h3 style={{textAlign:"center"}}>Preview</h3>
          <div id="simg">
          {s.map((data,index)=>{
            return(
              <img key={index} src={data}/>
            )
          })}
          </div>
          </div>
          <div style={{display:booleanUpload,position:"relative"}}><button  className="btn-grad ">Upload</button></div>
          <div style={{display:booleanUploadData,position:"relative"}}><button onClick={data} className="btn1-grad ">Upload Stories</button></div>
      </form>
    
    </div>
   
    <div className="video-upload">
      <h2>Video-Upload</h2>
      <form onSubmit={ok}>
      <div> <input id="vtd" placeholder="Video Title" required type="text" value={VideoTitle} onChange={(e)=>{
        setVideoTitle(e.target.value);
      }} /></div>
    <div><input  required id="vf" type="file" name="file" onChange={(e)=>{
     
      setfile(e.target.files[0]);
    }}/></div>
   <progress style={{display:pr3}} value={p2} max="100">0%</progress>
   <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}> 
   <button className="btn-grad" >Upload Videos</button>
   </div>
   </form>
    </div>
</div>
<h1>Delete Data</h1>
  <div className="deletes">
    <div className="adelete">
      <h2>Articles</h2>
      <div className="wrapper-article">
  {getArticlesdata.map((data,index)=>{
    return(<div key={data.id} className="combomain">
       <h5 style={{textAlign:"center"}}>Title</h5>
   <div className="acombo">
    
           <div className="combotitle">{data.name}</div>
          
         </div>
         <h5 style={{textAlign:"center"}}>Description</h5>
         <div  className="articlecontent">
           
           <div style={{display:"none"}}>{data.id}</div>
          
           <div id="descg">{data.desc}</div>
           
         </div>
         <h5 style={{textAlign:"center"}}>Image</h5>
         <div  className="videocontent">
           
           
          
          <img src={data.img}/>
           
         </div>
         <DeleteForeverIcon id="deletearticle" onClick={()=>{

           if(window.confirm("Are you Sure you want to Delete this Article")){
              const newList = getArticlesdata.filter((item) =>{
              
                 return item.id !== data.id
              });
              
   
              getArticles((prev)=>newList);
              const db=firebase.firestore();
              db.collection("articles").doc(data.id).delete().then(()=>{
                console.log("successfuly delted")
              }).catch(()=>{
                console.log("error");
              })
            }
           }}> </DeleteForeverIcon>
      </div>
    )
  })}
          </div>
    </div>
    <div className="sdelete">
    <h2>Stories</h2>
    <div className="wrapper-article">
  {getStoriesdata.map((data,index)=>{
     
    return(
      <div className="combo234" key={data.id2} >
        <h5 style={{textAlign:"center"}}>Stories</h5>
        <div className="acombo">
    
    <div className="combotitles">{data.storytitle78}</div>
   
  </div>
  <h5 style={{textAlign:"center"}}>Images</h5>
  <div  className="sotrycontent">
           
           <div style={{display:"none"}}>{data.id2}</div>
          
          <div className="imgwrapping67">
           
            
                 {
                  data.imgsr.map((data2,index34)=>{
                    return(
                      <img key={index34} src={data2} alt="fofpi"/>
                    )
                  })
                 }
                 
               
             
             
           </div>
         </div>
         <DeleteForeverIcon id="deletearticle" onClick={()=>{

if(window.confirm("Are you Sure you want to Delete this Story")){
   const newList = getStoriesdata.filter((item) =>{
    
      return item.id2 !== data.id2
   });
   

   getStories((prev)=>newList);
   const db=firebase.firestore();
   db.collection("stories").doc(data.id2).delete().then(()=>{
     console.log("successfuly deleted")
   }).catch(()=>{
     console.log("error");
   })
 
 }
}}></DeleteForeverIcon>
      </div>
    )
  })}
    </div>
    </div>
    <div className="vdelete">
    <h2>Videos</h2>
    </div>
  </div>
    </>
  );
}

export default App;
