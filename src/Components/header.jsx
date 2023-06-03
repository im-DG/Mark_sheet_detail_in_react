import React from 'react';

function Header() {
  return (
    <>
   
    <header>    
<div class="header-container"> 
<div className="logo">
    <img src="logo.png" alt="Logo" />
    <h2>Grade Sheet</h2>
  </div>
    <div class="header-info"> 
      <div class="header-item"><span class="header-heading">Title:</span> B.TECH</div> 
<div class="header-item"><span class="header-heading">Date:</span> 8th jun 2023</div> 
<div class="header-item"><span class="header-heading">Cordinator:</span>Manpreet Kaur</div> 
<div class="header-item"><span class="header-heading">College:</span> Gulzar group of College </div> 
<div class="header-item"><span class="header-heading">Department:</span> CSE</div> 
<div class="header-item"><span class="header-heading">Semester:</span> 8th</div> 
<div class="header-item"><span class="header-heading">Group:</span> A Group</div>
</div>
</div>
    </header>   
       </>
  );
}

export default Header;
