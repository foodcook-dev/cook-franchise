import{a as r,k as i,j as e,ag as m,r as d,B as h,c as t}from"./index-DDD4eibi.js";import{I as u}from"./input-BzTJxgO6.js";import{D as p,a as x,b as k,e as o}from"./dropdown-menu-CJZvIE4g.js";/**
 * @license @tabler/icons-react v3.21.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var n=r("outline","check","IconCheck",[["path",{d:"M5 12l5 5l10 -10",key:"svg-0"}]]);/**
 * @license @tabler/icons-react v3.21.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var j=r("outline","moon","IconMoon",[["path",{d:"M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z",key:"svg-0"}]]);/**
 * @license @tabler/icons-react v3.21.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var g=r("outline","sun","IconSun",[["path",{d:"M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",key:"svg-0"}],["path",{d:"M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7",key:"svg-1"}]]);function C(){const s=i.useTranslations("dashboard");return e.jsx("div",{children:e.jsx(u,{type:"search",placeholder:s("search"),className:"md:w-[100px] lg:w-[300px]"})})}function M(){const{theme:s,setTheme:a}=m();return d.useEffect(()=>{const c=s==="dark"?"#020817":"#fff",l=document.querySelector("meta[name='theme-color']");l&&l.setAttribute("content",c)},[s]),console.log(s),e.jsxs(p,{children:[e.jsx(x,{asChild:!0,children:e.jsxs(h,{variant:"ghost",size:"icon",className:"scale-95 rounded-full",children:[e.jsx(g,{className:"size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"}),e.jsx(j,{className:"absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"}),e.jsx("span",{className:"sr-only",children:"Toggle theme"})]})}),e.jsxs(k,{align:"end",children:[e.jsxs(o,{onClick:()=>a("light"),children:["Light"," ",e.jsx(n,{size:14,className:t("ml-auto",s!=="light"&&"hidden")})]}),e.jsxs(o,{onClick:()=>a("dark"),children:["Dark",e.jsx(n,{size:14,className:t("ml-auto",s!=="dark"&&"hidden")})]}),e.jsxs(o,{onClick:()=>a("system"),children:["System",e.jsx(n,{size:14,className:t("ml-auto",s!=="system"&&"hidden")})]})]})]})}export{C as S,M as T};
