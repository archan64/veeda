//Autofills field based on previous data in database for user settings
$(document).ready(function () {
    var userID = firebase.auth().currentUser.uid;
    return firebase.database().ref('/Users/' + userID).once('value').then(function (snapshot) {
        var firstName = snapshot.val().FirstName;
        document.getElementById("first_name_field").value = firstName;
    });
});


//Saves user data to the data base
$(function() {
    $('#account-info-btn').click(function(e){
        var firstName = $('#first_name').val();
        var lastName = $('#last_name').val();
        var phone = $('#phone').val();
        var mobile = $('#mobile').val();
        var email = $('#email').val();
        var city = $('#location').val();
        var userInfoKey = firebase.database().ref().child('users').push().key;
        firebase.database().ref('Users/'+ userInfoKey).set({
            FirstName:firstName,
            LastName:lastName,
            Phone:phone,
            Mobile:mobile,
            Email:email,
            Location:city,
        });
        e.preventDefault();
    });
});

/* pagination */
$.fn.pageMe = function(opts){
    var $this = this,
        defaults = {
            perPage: 7,
            showPrevNext: false,
            numbersPerPage: 1,
            hidePageNumbers: false
        },
        settings = $.extend(defaults, opts);

    var listElement = $this;
    var perPage = settings.perPage;
    var children = listElement.children();
    var pager = $('.pagination');

    if (typeof settings.childSelector!="undefined") {
        children = listElement.find(settings.childSelector);
    }

    if (typeof settings.pagerSelector!="undefined") {
        pager = $(settings.pagerSelector);
    }

    var numItems = children.size();
    var numPages = Math.ceil(numItems/perPage);

    pager.data("curr",0);

    if (settings.showPrevNext){
        $('<li><a href="#" class="prev_link">«</a></li>').appendTo(pager);
    }

    var curr = 0;
    while(numPages > curr && (settings.hidePageNumbers==false)){
        $('<li><a href="#" class="page_link">'+(curr+1)+'</a></li>').appendTo(pager);
        curr++;
    }

    if (settings.numbersPerPage>1) {
        $('.page_link').hide();
        $('.page_link').slice(pager.data("curr"), settings.numbersPerPage).show();
    }

    if (settings.showPrevNext){
        $('<li><a href="#" class="next_link">»</a></li>').appendTo(pager);
    }

    pager.find('.page_link:first').addClass('active');
    if (numPages<=1) {
        pager.find('.next_link').hide();
    }
    pager.children().eq(1).addClass("active");

    children.hide();
    children.slice(0, perPage).show();

    pager.find('li .page_link').click(function(){
        var clickedPage = $(this).html().valueOf()-1;
        goTo(clickedPage,perPage);
        return false;
    });
    pager.find('li .prev_link').click(function(){
        previous();
        return false;
    });
    pager.find('li .next_link').click(function(){
        next();
        return false;
    });

    function previous(){
        var goToPage = parseInt(pager.data("curr")) - 1;
        goTo(goToPage);
    }

    function next(){
        goToPage = parseInt(pager.data("curr")) + 1;
        goTo(goToPage);
    }

    function goTo(page){
        var startAt = page * perPage,
            endOn = startAt + perPage;

        children.css('display','none').slice(startAt, endOn).show();

        if (page>=1) {
            pager.find('.prev_link').show();
        }
        else {
            pager.find('.prev_link').hide();
        }

        if (page<(numPages-1)) {
            pager.find('.next_link').show();
        }
        else {
            pager.find('.next_link').hide();
        }

        pager.data("curr",page);

        if (settings.numbersPerPage>1) {
            $('.page_link').hide();
            $('.page_link').slice(page, settings.numbersPerPage+page).show();
        }

        pager.children().removeClass("active");
        pager.children().eq(page+1).addClass("active");
    }
};

$('#items').pageMe({pagerSelector:'#myPager',childSelector:'tr',showPrevNext:true,hidePageNumbers:false,perPage:5});
/****/