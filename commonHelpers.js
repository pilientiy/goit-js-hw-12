import{i as u,S as g,a as L}from"./assets/vendor-5401a4b0.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function c(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=c(r);fetch(r.href,o)}})();function b({webformatURL:e,largeImageURL:a,tags:c,likes:n,views:r,comments:o,downloads:i}){return`<li class="gallery-list">
    <a class="gallery-link" href="${a}"><img class="img-gallery" src="${e}" alt="${c}"></a>
    <div class="info-img">
      
      <div>
        <h3>Likes</h3>
        <p>${n}</p>
      </div>

      <div>
        <h3>Views</h3>
        <p>${r}</p>
      </div>

      <div>
        <h3>Comments</h3>
        <p>${o}</p>
      </div>

      <div>
        <h3>Downloads</h3>
        <p>${i}</p>
      </div>

    </div>
  </li>`}const v="42358755-2f91a8a1ff3edf8f2432f22e1",w="https://pixabay.com/api/";function f(e){e.classList.remove("hidden")}function s(e){e.classList.add("hidden")}const t={searchForm:document.querySelector(".search-form"),galleryList:document.querySelector(".gallery"),loader:document.querySelector(".loader"),btnLodeMore:document.querySelector(".load-btn")};let h,l=1,m=15,d="";t.searchForm.addEventListener("submit",M);async function M(e){e.preventDefault(),f(t.loader),s(t.btnLodeMore),t.galleryList.innerHTML="",l=1,d=e.target.elements.query.value;try{const a=await y(d);p(a.hits)}catch(a){s(t.btnLodeMore),u.error({message:`${a}`,position:"topRight",backgroundColor:"red",messageColor:"white"})}finally{t.searchForm.reset(),s(t.loader)}}t.btnLodeMore.addEventListener("click",S);async function S(){l+=1,f(t.loader);try{const e=await y(d);if(p(e.hits),window.scrollBy({top:400,behavior:"smooth"}),l*m>e.totalHits)throw s(t.btnLodeMore),new Error("We're sorry, but you've reached the end of search results.")}catch(e){u.error({message:` ${e}`,position:"topRight",backgroundColor:"red",messageColor:"white"}),s(t.btnLodeMore)}finally{s(t.loader)}}function p(e){if(e.length===0)u.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"red",messageColor:"white"});else{const a=e.map(b).join("");t.galleryList.insertAdjacentHTML("beforeend",a),h=new g(".gallery a",{captionDelay:250,captionsData:"alt"}),h.refresh(),f(t.btnLodeMore)}}async function y(e){return(await L(w,{params:{key:v,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:m,page:l}})).data}
//# sourceMappingURL=commonHelpers.js.map
