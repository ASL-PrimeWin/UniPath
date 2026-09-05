const COLLEGES=[
{id:'iit-madras',name:'IIT Madras',city:'Chennai',state:'Tamil Nadu',category:'Engineering',rank:1,fees:250000,exam:'JEE Advanced',hostel:true,courses:['B.Tech CSE','B.Tech Mechanical','B.Tech Electrical']},
{id:'iit-delhi',name:'IIT Delhi',city:'New Delhi',state:'Delhi',category:'Engineering',rank:2,fees:240000,exam:'JEE Advanced',hostel:true,courses:['B.Tech CSE','B.Tech Electrical','B.Tech Mathematics & Computing']},
{id:'iit-bombay',name:'IIT Bombay',city:'Mumbai',state:'Maharashtra',category:'Engineering',rank:3,fees:230000,exam:'JEE Advanced',hostel:true,courses:['B.Tech CSE','B.Tech Aerospace','B.Tech Electrical']},
{id:'iit-kanpur',name:'IIT Kanpur',city:'Kanpur',state:'Uttar Pradesh',category:'Engineering',rank:4,fees:220000,exam:'JEE Advanced',hostel:true,courses:['B.Tech CSE','B.Tech Electrical','B.Tech Mechanical']},
{id:'iit-kharagpur',name:'IIT Kharagpur',city:'Kharagpur',state:'West Bengal',category:'Engineering',rank:5,fees:225000,exam:'JEE Advanced',hostel:true,courses:['B.Tech CSE','B.Tech Electronics','B.Tech Mechanical']},
{id:'iit-hyderabad',name:'IIT Hyderabad',city:'Hyderabad',state:'Telangana',category:'Engineering',rank:7,fees:210000,exam:'JEE Advanced',hostel:true,courses:['B.Tech CSE','B.Tech AI','B.Tech Electrical']},
{id:'iit-guwahati',name:'IIT Guwahati',city:'Guwahati',state:'Assam',category:'Engineering',rank:8,fees:215000,exam:'JEE Advanced',hostel:true,courses:['B.Tech CSE','B.Tech Electronics','B.Tech Mechanical']},
{id:'nit-trichy',name:'NIT Trichy',city:'Tiruchirappalli',state:'Tamil Nadu',category:'Engineering',rank:9,fees:180000,exam:'JEE Main',hostel:true,courses:['B.Tech CSE','B.Tech ECE','B.Tech Mechanical']},
{id:'nit-surathkal',name:'NITK Surathkal',city:'Surathkal',state:'Karnataka',category:'Engineering',rank:17,fees:175000,exam:'JEE Main',hostel:true,courses:['B.Tech CSE','B.Tech IT','B.Tech ECE']},
{id:'iim-bangalore',name:'IIM Bangalore',city:'Bengaluru',state:'Karnataka',category:'Management',rank:2,fees:1200000,exam:'CAT',hostel:true,courses:['BBA / Integrated Program','MBA']}
];
const EXAMS=[
{name:'JEE Main',type:'Engineering',body:'NTA',mode:'Computer Based Test'},
{name:'JEE Advanced',type:'Engineering',body:'IITs',mode:'Computer Based Test'},
{name:'NEET UG',type:'Medical',body:'NTA',mode:'Pen and Paper'},
{name:'CAT',type:'Management',body:'IIMs',mode:'Computer Based Test'},
{name:'CLAT',type:'Law',body:'Consortium of NLUs',mode:'Computer Based Test'},
{name:'NATA',type:'Architecture',body:'Council of Architecture',mode:'Computer Based Test'}
];
const NIRF_CATEGORIES=['Overall','Universities','Colleges','Research Institutions','Engineering','Management','Pharmacy','Medical','Dental','Law','Architecture and Planning','Agriculture and Allied Sectors','Innovation','Open University','Skill University'];
function getCollege(id){return COLLEGES.find(c=>c.id===id)}
function money(n){return '₹'+Number(n).toLocaleString('en-IN')}
