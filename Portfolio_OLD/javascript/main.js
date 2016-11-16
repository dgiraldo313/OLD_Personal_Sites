function setPathLink(){
    // find out path to assign active links
    var pathArray = window.location.pathname.split( '/' );
    var pathName= pathArray[1];

    if(pathName==='about.html'){
        $("#about a").addClass("link-active");
        $('body').attr('id','about-background');

    }else if(pathName==='work.html'){
        $("#work a").addClass("link-active");
        $('body').attr('id','work-background');
    }else if(pathName==='contact.html'){
        $("#contact a").addClass("link-active");
        $('body').attr('id','contact-background');
    }else if(pathName===''){
        $('body').attr('id','home-background');
    }
}


function toggleMenu(){
    var $this= $(".btn");
    $this.click(function(){
        if($this.attr('id')==="lines") {
            $this.removeAttr('id','lines').attr('id','exit');
            $("ul").attr('class','menu-active');
        } else {
            $this.removeAttr('id','exit').attr('id','lines');
            $("ul").removeAttr('class','menu-active');
        }
    });

}

function toggleSkills(){
    var show_button = $("#show");
    var hide_button = $("#hide");
    var skills = $(".skills-container");

    show_button.click(function(){
      show_button.attr('id', 'hide');
      hide_button.removeAttr('id','show');
      skills.css({"visibility":"visible", "opacity":"1"});
    });

    hide_button.click(function(){
      hide_button.attr('id', 'hide');
      show_button.removeAttr('id','show');
      skills.removeAttr("style");
    });
}


$(document).ready(function(){
    setPathLink();
    toggleMenu();
    toggleSkills();

});
