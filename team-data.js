const director=['Seungwoo Je','Director, Assistant Professor','seungwoo.jpg','seungwoo.html'];
const team=[
['Xuesong Zhang','Postdoctoral Researcher','xuesong.jpg','https://hcisong.github.io/'],['Qianyuan Zou','Postdoctoral Researcher','qianyuan.png',''],['Tianze Xie','PhD Student','tianze.jpg','https://tiaraaaaaa.github.io/'],['Weitao Jiang','PhD Student','weitao.jpg','https://portfolio-weitao.vercel.app/'],['Shenshen Lei','PhD Student','shenshen.jpg',''],['Zhicheng Wang','PhD Student','zhicheng.jpg','https://zhicheng_wang.gitlab.io/'],['Kaihan Wang','Master’s Student','kaihan.webp',''],['Yingjie Chang','Master’s Student','yingjie.jpg',''],['Zezheng Guan','Master’s Student','zezheng.webp',''],['Zhuoran Wang','Master’s Student','zhuoran.jpg',''],['Bocheng Zhong','Master’s Student','bocheng.jpg',''],['Jiaxi Hu','Master’s Student','jiaxi.jpg',''],['Jiale Chen','Researcher, Mechanical Design','jiale.jpg',''],['Xuelin Li','Group Coordinator, Administration','xuelin.jpg',''],['Hanzhong Luo','Visiting Student','hanzhong.jpg',''],['Jizeng Wang','Undergraduate Intern','jizeng.jpg',''],['Anna Surovkova','Undergraduate Intern','anna.png',''],['Xuehan Huang','Visiting Student','xuehan.jpg',''],['Zhaohan (Chester) Pan','Visiting Student','chester.png',''],['Duy Nam Ly','Visiting Student','duynam.jpg','']];
team.find(([name])=>name==='Qianyuan Zou')[3]='https://zouqianyuan.github.io/qianyuanzou/index.html#';
team.push(
  ['Xinyi Pu','PhD Student','xinyi-pu.jpg','https://reneessense.github.io/Portfolio/'],
  ['Zixin Chen','PhD Student','zixin-chen.jpg',''],
  ['Guimeng Zhang','Master’s Student','guimeng-zhang.jpg',''],
  ['Changyan Xu','Master’s Student','changyan-xu.jpg',''],
  ['Yuxuan Ma','Visiting Student','yuxuan-ma.jpg','https://yuxuan-ma.vercel.app/']
);
const alumni2026=['Kaihan Wang','Yingjie Chang','Zezheng Guan','Bocheng Zhong'];
const formerMembers=[...alumni2026,'Jiale Chen','Anna Surovkova','Xuehan Huang','Hanzhong Luo'];
const websiteIcon=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5"></path><path d="M6.5 9.5V20h11V9.5M10 20v-6h4v6"></path></svg>`;
const card=([name,role,img,url])=>`<article class="team-card">${img?`<img src="assets/members/${img}" alt="Portrait of ${name}" loading="lazy">`:`<div class="team-photo-placeholder" role="img" aria-label="Photo placeholder for ${name}">${name.split(/\s+/).map(part=>part[0]).join('').slice(0,2)}</div>`}<div class="team-name-row"><h2>${name}</h2>${url?`<a class="team-homepage" href="${url}"${url.startsWith('http')?' target="_blank" rel="noopener"':''} aria-label="Visit ${name}'s website" title="Personal website">${websiteIcon}</a>`:''}</div><p>${role}</p></article>`;
const currentMemberOrder=role=>{
  if(role.includes('Postdoctoral')) return 1;
  if(role.includes('PhD')) return 2;
  if(role.includes('Master')) return 3;
  if(role.includes('Visiting') || role.includes('Intern')) return 4;
  if(role.includes('Group Coordinator') || role.includes('Administration')) return 5;
  return 4;
};
const alumniGroups=[
['PhD Students',[['Ashfaque Khowaja, اشفاق خواجه','Ph.D. Alumna, 2024.09. - 2025.12.']]],
['Master\'s Students',[['Kaihan Wang','Master 2026'],['Yingjie Chang','Master 2026'],['Zezheng Guan','Master 2026'],['Bocheng Zhong','Master 2026'],['Yuxin Ma 马雨欣','Master 2025, 2022.09. - 2025.07.'],['Yilong Lin 林毅龙','Master 2025, 2022.09. - 2025.07.'],['Peng Zhang 张鹏','Master 2025, 2022.09. - 2025.07.'],['Haoran Ding 丁浩然','Master 2025, 2022.09. - 2025.07.']]],
['RAs & Visiting Students',[['Yuanyuan Bao','Visiting Student, Université Claude Bernard Lyon 1'],['Kanyu Chen','Visiting Student, Keio University'],['Junyu Chen','Research Assistant, University of Tokyo'],['Han Shi','Visiting Student, Fudan University'],['Cedric Honnet','Visiting Student, MIT CSAIL + Media Lab'],['Qunzhi Jin','Visiting Student, Dalian Minzu University'],['Subin Kwak','Visiting Student, Hanyang University'],['PiaoHong Wang','Visiting Student, CityU HK']]],
['Undergraduate Interns',[['Xinan Yang','Undergraduate Intern, SUSTech'],['Gu Yujie','Undergraduate Intern, Zhejiang University of Technology'],['Sirui Wang','Undergraduate Intern, NYU'],['Umid Nazarov','Undergraduate Intern, WIUT'],['Zhiming Zhang','Undergraduate Intern, SUSTech'],['Sophia J Wang','Undergraduate Intern, MIT'],['Ke Ding','Undergraduate Intern, UNNC'],['Ruxiao Chen','Undergraduate Intern, Shandong University'],['Feiyu Huang','Undergraduate Intern, HIT(Shenzhen)'],['Zhao Yong','Undergraduate Intern, SUSTech'],['Zhou Qijunxiao','Undergraduate Intern, SUSTech'],['Ye Zi','Undergraduate Intern, SUSTech'],['Ji Jiali','Undergraduate Intern, SUSTech']]]
];
alumniGroups.find(([heading])=>heading==='RAs & Visiting Students')[1].unshift(
  ['Hanzhong Luo','Visiting Student, Tsinghua University'],
  ['Jiale Chen','Research Assistant'],
  ['Xuehan Huang','Visiting Student, The University of Hong Kong']
);
alumniGroups.find(([heading])=>heading==='Undergraduate Interns')[1].unshift(
  ['Anna Surovkova','Undergraduate Intern, Masaryk University']
);
const master2025Names=['Yuxin Ma','Yilong Lin','Peng Zhang','Haoran Ding'];
alumniGroups.find(([heading])=>heading==="Master's Students")[1].forEach(person=>{
  const englishName=master2025Names.find(name=>person[0].startsWith(name));
  if(englishName){person[0]=englishName;person[1]='Master 2025'}
});
const grid=document.getElementById('team-grid');
if(grid){
  const currentMembers=team
    .filter(([name])=>!formerMembers.includes(name))
    .map((member,index)=>({member,index}))
    .sort((a,b)=>currentMemberOrder(a.member[1])-currentMemberOrder(b.member[1]) || a.index-b.index)
    .map(({member})=>member);
  grid.innerHTML=[director,...currentMembers].map(card).join('');
  const alumniSection=[...document.querySelectorAll('.people-section')].find(s=>s.querySelector('h2')?.textContent.trim()==='Alumni');
  if(alumniSection){alumniSection.innerHTML=`<h2>Alumni</h2><div class="alumni-groups">${alumniGroups.map(([heading,people])=>`<section><h3>${heading}</h3>${people.map(([name,detail])=>`<p>${name} <span>(${detail})</span></p>`).join('')}</section>`).join('')}</div>`}
}
