$(function() {
    //$(".header").load("header.html");

    //ktra login, nếu có thì load home.html, ko thì load login.html
    if(session){ //da login
        $(".main").load("afterlogin.html");
        $(".footer").load("footer.html");
        
    }
    else{
        $(".main").load("login.html");
        $(".footer").load("footer.html");
    }

    
    
});

function clickNavLogin() {
    if(session){ //da login
        $(".main").load("afterlogin.html");
        return;
    }

    $(".main").load("login.html");
}
function clickNavUserDetail() {
    if(!session){
        console.log("session ko co");
       
        $(".main").load("notLogin.html");
        return;
    }
  
    $(".main").load("userInfo.html", function() {
        $(".full-name").append(userDetail.fullName);
        $(".userNameinfo").append(userDetail.name);
        $(".ufirstName").append(userDetail.firstName);
        $(".ulastname").append(userDetail.lastName);
        $(".userEmail").append(userDetail.email);
    });
    
}
function hideMenu(){
    $("#menuLeft").css('display','none');
}

function Employee(id, username,email, firstName, lastName, password, department) {
    this.accountID = id;
    this.userName = username;
    this.email = email;
    this.fisrtName = firstName;
    this.lastName = lastName;
    this.passWord = password;
    this.department = department;
    this.fullName = this.fisrtName + this.lastName;
}
var employees = [];

// luu lai o local storage
var session = localStorage.getItem("userLogin") ? JSON.parse(localStorage.getItem("userLogin")) : "";
var userDetail = localStorage.getItem("userDetail") ? JSON.parse(localStorage.getItem("userDetail")) : "";
function logOut(){
    session = null;
    userDetail = null;
    localStorage.removeItem("userLogin");
    localStorage.removeItem("userDetail");
    sessionStorage.removeItem("userLogin");
    $(".main").load("login.html");
}
function login() {
    session = null;
    userDetail = null;
    $(".main").load("login.html");
    
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    
        //   $.get(url, function(data,status){

        //     if(!(data && data.id)){
        //         alert("Tài khoản không tồn tại");
        //     }

        //     if (status == "error") {
        //         alert("Error when loading data");
        //         return;
        //     }
            
        //     // success    
        //     if(data.name == username && data.passWord == password){
                
        //         // luu user vao localStrogae
        //         localStorage.setItem("userLogin",JSON.stringify(data));
        //         session =  data;

        //         hideModal();
        //         $(".main").load("home.html");
                
        //         showSuccessLoginAlert();
                
                
    
        //     }
        //     else {
        //         hideModal();
        //         showFailLoginAlert();
               
        //     }
        // });
        
        
        $.ajax({
            url:'http://localhost:8080/api/v1/users/login',
            type: 'GET',
            dataType: 'json',
            contentType: "application/json",
            beforeSend: function(xhr){
                xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
            },
            success: function(data, status) {
                // error
                if (status == "error") {
                    alert("Error when loading data");
                    return;
                }
                console.log(data);
                // success
                if(!(data && data.id)){
                    alert("Tài khoản không tồn tại");
                }
            
                if (status == "error") {
                    alert("Error when loading data");
                    return;
                }
                        
                        // success    
                if(data != null){
                            
                    var req = {
                        username: username,
                        password: password,
                        id: data.id
                    }
                     // luu user vao localStrogae
                    localStorage.setItem("userLogin", JSON.stringify(req));
                    localStorage.setItem("userDetail", JSON.stringify(data));
                    userDetail = data;
                    console.log(userDetail);
                    console.log(req);
                    session = req;
                   
                    

            
                    hideModal();
                    $(".main").load("home.html");
                            
                    showSuccessLoginAlert();
                            
                            
                
                }
                else {
                    hideModal();
                    showFailLoginAlert();
                           
                }
                
            },
            error(){
                
            }
        })
}
function showSuccessLoginAlert() {
    
    $("#loginsuccess-alert").fadeTo(2000, 500).slideUp(500, function() {
        $("#loginsuccess-alert").slideUp(500);
    });
}
function showFailLoginAlert() {
    $("#loginFail-alert").fadeTo(2000, 500).slideUp(500, function() {
        $("#loginFail-alert").slideUp(500);
    });
}
function clickNavHome() {
    $(".main").load("home.html");
}

function clickNavViewListEmployees() {
    if(!session){
        console.log("session ko co");
        $(".main").load("notLogin.html");
        return;
    }
    $(".main").load("viewlistemployees.html");
    console.log(session);
    buildTable();
}





var departments = [];
function Department(id,name,totalMember, creator, createDate) {
    this.id = id;
    this.name = name;
    this.totalMember = totalMember;
    this.createDate = createDate;
    this.creatorName = creator;
    
    
}

function getListPageDepartments() {
    // call API from server
    console.log(session);
    $.ajax({
        url:'http://localhost:8080/api/v1/groups/',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json",
        beforeSend: function(xhr){
            xhr.setRequestHeader("Authorization", "Basic " + btoa(session.username + ":" + session.password));
        },
        success: function(data, status) {
            departments = [];

        // error
            if (status == "error") {
            // TODO
                alert("Error when loading data");
                return;
            }
            parseData(data);
            fillPageToTable();
            // success  
                
            
        },
        error(){
            
        }
    })
    
    // $.get("http://localhost:8080/api/v1/groups/", function(data, status) {

    //     // reset list employees
    //     departments = [];

    //     // error
    //     if (status == "error") {
    //         // TODO
    //         alert("Error when loading data");
    //         return;
    //     }
    //     parseData(data);
    //     fillPageToTable();
    //     // success
    // });
}
var count = 0;
function fillPageToTable() {
    count = 0;
    $('ul').empty();
    console.log('chay vao day');
    $('ul').append('<li><a href="#"onclick="prePage() ><<</a></li>');
    departments.forEach(function(item) {
        count++;
    });
    console.log(count);
    var maxPage;
    if(count % 5 == 0){
        maxPage = count / 5;
    }
    else{
        maxPage = Math.floor(count/5);
        maxPage++;
        
    }
    console.log(maxPage);
    for (page = 0 ; page < maxPage  ; page ++){
        $('ul').append('<li><a href="#" class = "page" onclick="getListDepartments('+page+',5)">'+ (page + 1) +'</a></li>');
    }
    getListDepartments(0,5);
    $('ul').append('<li><a href="#" onclick="nextPage()" >>></a></li>');
    
  
}
function fillPageToTable2(name) {
    console.log(name);
    let pageSize = 5;
    count = 0;
    $('ul').empty();
    $('ul').append('<li><a href="#"onclick="prePage() ><<</a></li>');
    departments.forEach(function(item) {
        count++;
               
    });
    var maxPage;
    if(count % 5 == 0){
        maxPage = count / 5;
    }
    else{
        maxPage = Math.floor(count/5);
        maxPage++;
        
    }
    console.log(maxPage);
    for (page = 0 ; page < maxPage  ; page ++){
        $('ul').append('<li><a href="#" class = "page" onclick="getListDepartments2('+page+','+pageSize+')">'+ (page + 1) +'</a></li>');
    }
    $('ul').append('<li><a href="#" onclick="nextPage()" >>></a></li>');
       
  
}

function getListDepartments(page,pageSize) {
    // call API from server
    if(!page) page = 0;
    if(!pageSize) pageSize = 5;
    $('tbody').empty();
    $.ajax({
        url:'http://localhost:8080/api/v1/groups?page='+page+'&pageSize='+pageSize+'',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json",
        beforeSend: function(xhr){
            xhr.setRequestHeader("Authorization", "Basic " + btoa(session.username + ":" + session.password));
        },
        success: function(data, status) {
            departments = [];

        // error
            if (status == "error") {
                // TODO
                alert("Error when loading data");
                return;
            }

            // success
            parseData(data);
            fillDepartmentsToTable();
                    
            
        },
        error(){
            
        }
    })
    // $.get("http://localhost:8080/api/v1/groups?page="+page+"&pageSize="+pageSize+"", function(data, status) {

    //     // reset list employees
    //     departments = [];

    //     // error
    //     if (status == "error") {
    //         // TODO
    //         alert("Error when loading data");
    //         return;
    //     }

    //     // success
    //     parseData(data);
    //     fillDepartmentsToTable();
    // });
    // console.log(count);
}
function getListDepartments2(page,pageSize,serach) {
    if(!serach) serach = document.getElementById("serachName").value;
    // call API from server
    if(!page) page = 0;
    if(!pageSize) pageSize = 5;
    $('tbody').empty();
    $.ajax({
        url: "http://localhost:8080/api/v1/groups?page="+page+"&pageSize="+pageSize+"&serach="+serach,
        type: 'GET',
        contentType: "application/json",// type of body (json, xml, text)
        //dataType: 'json', // datatype return
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(session.username + ":" + session.password));
        },
        success: function (data, textStatus, xhr) {
            departments = [];
            if (status == "error") {
            // TODO
                alert("Error when loading data");
                return;
            }

        // success
            parseData(data);
            fillDepartmentsToTable();
 
        },
        error(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 403) {

            } else {
                console.log();
                console.log(textStatus);
                console.log(errorThrown);
            }
        }
    });
    // $.get("http://localhost:8080/api/v1/groups?page="+page+"&pageSize="+pageSize+"&serach="+serach, function(data, status) {

    //     // reset list employees
    //     departments = [];

    //     // error
    //     if (status == "error") {
    //         // TODO
    //         alert("Error when loading data");
    //         return;
    //     }

    //     // success
    //     parseData(data);
    //     fillDepartmentsToTable();
    // });
    
    console.log(count);
}
function parseData(data) {
    
    data.forEach(function(item) {
        departments.push(new Department(item.id,item.name,item.totalMember,item.creatorName,item.createDate));
        
    });

    // data.forEach(function(item) {
    //     employees.push(new Employee(item.id, item.name));
    // });
}
function parseData2(data) {
    
    isExsist = data;


}
function openAddDepartmentModal(){
    resetForm3();
    openModal();
}
function resetForm3() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("totalMember").value = "";
}
var old_name;
function save3() {
    console.log("ddddasdsdds");
    var id = document.getElementById("id").value;
    
    if (id == null || id == "") {
        console.log("vao day ne 123");
        addDepartment();
    } else {
        updateDepartment();
    }
}
function displayError(){
    $("#errorLengthName").css('display','none');
    $("#errorMaxLengthName").css('display','none');
    $("#errorDuplicateName").css('display','none');
}
var isExsist = null ;
function addDepartment() {
    
    
    // get data
    var totalMember = document.getElementById("totalMember").value;
    var name = document.getElementById("name").value;
    var id = session.id;
    //check Group name
    if(name.length < 6 ){
        $("#errorLengthName").css('display','block');
        return;
    }
    else if (name.length > 50){
        $("#errorLengthName").css('display','none');
        $("#errorMaxLengthName").css('display','block');
        return;
    }
    console.log("vao day ne");
    // check Group ton tai
 
    $.ajax({
        url: "http://localhost:8080/api/v1/groups/detail/"+name,
        type: 'GET',
        contentType: "application/json",// type of body (json, xml, text)
        //dataType: 'json', // datatype return
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(session.username + ":" + session.password));
        },
        success: function (data, textStatus, xhr) {
            if (!data) {
                var group = {
                    creatorID: id,
                    totalMember: totalMember,
                    name: name,
                };
                $.ajax({
                    url: 'http://localhost:8080/api/v1/groups',
                    type: 'POST',
                    data: JSON.stringify(group), // body
                    contentType: "application/json", // type of body (json, xml, text)
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(session.username + ":" + session.password));
                    },
                    // dataType: 'json', // datatype return
                    success: function (data, textStatus, xhr) {

                        hideModal();
                        showSuccessAlert();
                        buildTable();
                    },
                    error(jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
            } else {
                $("#errorDuplicateName").css('display','block');
                return;
            }
        },
        // error(jqXHR, textStatus, errorThrown) {
        //     if (jqXHR.status == 403) {

        //     } else {
        //         console.log();
        //         console.log(textStatus);
        //         console.log(errorThrown);
        //     }
        // }
    });
  


    // $.get("http://localhost:8080/api/v1/groups/detail/"+name, function(data, status) {
    //     console.log("vao day ne1");
    //     // reset list employees
    //     isExsist = null;

    //     // error
    //     if (status == "error") {
    //         // TODO
    //         alert("Error when loading data");
    //         return;
    //     }
      
    //     if(!data){
    //         console.log("vao day ne4");
    //         var group = {
    //             creatorID: id,
    //             totalMember: totalMember,
    //             name: name,
    //         };
    //         $.ajax({
    //             url:'http://localhost:8080/api/v1/groups',
    //             type: 'POST',
    //             data: JSON.stringify(group),
    //             contentType: "application/json",
    //             success: function(data, status) {
    //                 // error
    //                 if (status == "error") {
    //                     alert("Error when loading data");
    //                     return;
    //                 }
        
    //                 // success
    //                 hideModal();
    //                 showSuccessAlert();
    //                 buildTable();
    //             },
    //             error(){
                    
    //             }
    //         })
    //         return;
    //     }
    //     else{
    //         isExsist = 1;
    //         console.log("vao day ne5");
    //         $("#errorDuplicateName").css('display','block');
    //         return;
    //     }
    //     // success
    // });
}
var isExsist2 = null;
function updateDepartment() {
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var totalMember = document.getElementById("totalMember").value;
    

    $.ajax({
        url: "http://localhost:8080/api/v1/groups/detail/"+name,
        type: 'GET',
        contentType: "application/json",// type of body (json, xml, text)
        //dataType: 'json', // datatype return
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(session.username + ":" + session.password));
        },
        success: function (data, textStatus, xhr) {
            if (!data || old_name == name) {
                var group = {
                    creatorID: session.id,
                    totalMember: totalMember,
                    name: name,
                };
                $.ajax({
                    url: 'http://localhost:8080/api/v1/groups/' + id,
                    type: 'PUT',
                    data: JSON.stringify(group), // body
                    contentType: "application/json", // type of body (json, xml, text)
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa(session.username + ":" + session.password));
                    },
                    // dataType: 'json', // datatype return
                    success: function (result) {

                        if (result == undefined || result == null) {
                            alert("Error when loading data");
                            return;
                        }
                                
                                            // success
                        hideModal();
                        showSuccessAlert();
                        buildTable();
                    },
                    error(jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
            } else {
                $("#errorDuplicateName").css('display','block');
                return;
            }
        },
        error(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 403) {

            } else {
                console.log();
                console.log(textStatus);
                console.log(errorThrown);
            }
        }
    });
    // check Group ton tai
    // $.get("http://localhost:8080/api/v1/groups/detail/"+name, function(data, status) {

    //     // reset list employees
    //     isExsist2 = null;

    //     // error
    //     if (status == "error") {
    //         // TODO
    //         alert("Error when loading data");
    //         return;
    //     }
    //     console.log(data);
    //     console.log(old_name +" "+ name);
    //     if(!data || old_name == name){
    //         var group = {
    //             creatorID: session.id,
    //             name: name,
    //             totalMember: totalMember
    //         };
        
    //         $.ajax({
    //             url: 'http://localhost:8080/api/v1/groups/' + id,
    //             type: 'PUT',
    //             data: JSON.stringify(group),
    //             contentType: "application/json",
    //             success: function(result) {
    //                 // error
    //                 if (result == undefined || result == null) {
    //                     alert("Error when loading data");
    //                     return;
    //                 }
        
    //                 // success
    //                 hideModal();
    //                 showSuccessAlert();
    //                 buildTable();
    //             }
    //         });
    //         return;
    //     }
    //     else{
    //         isExsist2 = 1;
    //         $("#errorDuplicateName").css('display','block');
    //         return;
    //     }
    //     // success
    // });
    
    // TODO validate
    // then fail validate ==> return;

    
}
function serach(){
    var serach = document.getElementById("serachName").value;

    // $.get("http://localhost:8080/api/v1/groups?page=0&pageSize=100&serach="+serach, function(data, status) {

    //     // reset list employees
    //     departments = [];

    //     // error
    //     if (status == "error") {
    //         // TODO
    //         alert("Error when loading data");
    //         return;
    //     }
    //     parseData(data);
    //     fillPageToTable2(serach);
    //     // success
    // });
    // getListDepartments2(0,5,serach);
    $.ajax({
        url: "http://localhost:8080/api/v1/groups?page=0&pageSize=100&serach="+serach,
        type: 'GET',
        contentType: "application/json",// type of body (json, xml, text)
        //dataType: 'json', // datatype return
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(session.username + ":" + session.password));
        },
        success: function (data, textStatus, xhr) {
            departments = [];

            // error
            if (status == "error") {
                // TODO
                alert("Error when loading data");
                return;
            }
            parseData(data);
            fillPageToTable2(serach);
        },
        error(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 403) {

            } else {
                console.log();
                console.log(textStatus);
                console.log(errorThrown);
            }
        }
    });
    getListDepartments2(0,5,serach);
}

function fillDepartmentsToTable() {
    departments.forEach(function(item) {
        $('tbody').append(
            
            '<tr>' +
            '<td>' + "<input type="+"checkbox"+" class="+"deleteChoices"+" id ="+item.id+" name="+"deleteChoices"+" value="+"delete"+">" + '</td>' +
            '<td>' + item.id + '</td>' +
            '<td>' + item.name + '</td>' +
            '<td>' + item.totalMember + '</td>' +
            '<td>' + item.creatorName + '</td>' +
            '<td>' + item.createDate + '</td>' +
            '<td>' +
            '<a class="edit" title="Edit" data-toggle="tooltip" onclick="openUpdateDepartmentModal(' + item.id + ')"><i class="material-icons">&#xE254;</i></a>' +
            '<a class="delete" title="Delete" data-toggle="tooltip" onClick="openConfirmDepartmentDelete(' + item.id + ')"><i class="material-icons">&#xE872;</i></a>' +
            '</td>' +
            '</tr>')
    });
}
function getListSelectedGroup(){
    var listID = [];
    $.each($("input[name='deleteChoices']:checked"), function(){
        listID.push($(this).attr("id"));
    });
    return listID;
}
function deleteAllSelected(){
    var listDelete = getListSelectedGroup();
    openConfirmDeleteMany(listDelete);
}
function openConfirmDeleteMany(listID) {
    // get index from employee's id
    var result = confirm("Want to delete " + listID.length + " groups?");
    if (result) {
        deleteManyGroups(listID);
    }
}
function selectAll(){
    $("#selectAll").click(function(){
        $("input[type=checkbox]").prop('checked', $(this).prop('checked'));
        
    });
   
}
function deleteManyGroups(listID) {
    // TODO validate
    listID.forEach(element => {
        console.log(element);
        $.ajax({
            url: 'http://localhost:8080/api/v1/groups/' + element,
            type: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(session.username + ":" + session.password));
            },
            success: function(result) {
                // success
               
            },
            error(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                alert("Xóa thất bại");
                return;
            },
            
        });
    });
    showSuccessAlert();
    buildTable();
    
}

function openUpdateDepartmentModal(id) {

    // get index from employee's id
    var index = departments.findIndex(x => x.id == id);

    // fill data
    document.getElementById("totalMember").value = departments[index].totalMember;
    document.getElementById("name").value = departments[index].name;
    document.getElementById("id").value = departments[index].id;

    openModal();
}
function openConfirmDelete(id) {
    // get index from employee's id
    var index = employees.findIndex(x => x.id == id);
    var name = employees[index].name;

    var result = confirm("Want to delete " + name + "?");
    if (result) {
        deleteEmployee(id);
    }
}
function openConfirmDepartmentDelete(id) {
    // get index from employee's id
    var index = departments.findIndex(x => x.id == id);
    var name = departments[index].name;

    var result = confirm("Want to delete " + name + "?");
    if (result) {
        deleteDepartment(id);
    }
}
function deleteDepartment(id) {
    // TODO validate

    $.ajax({
        url: 'http://localhost:8080/api/v1/groups/' + id,
        type: 'DELETE',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(session.username + ":" + session.password));
        },
        success: function(result) {
            // error
            if (result == undefined || result == null) {
                alert("Error when loading data");
                return;
            }

            // success
            showSuccessAlert();
            buildTable();
        }
    });
}

function buildTable() {
    $('tbody').empty();
    getListPageDepartments();
}

function openAddModal() {
    resetForm();
    openModal();
}

function resetForm() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
}

function openModal() {
    old_name = document.getElementById("name").value;
    $('#myModal').modal('show');
    $("#errorLengthName").css('display','none');
    $("#errorMaxLengthName").css('display','none');
    $("#errorDuplicateName").css('display','none');
}

function hideModal() {
    $('#myModal').modal('hide');
}

function addEmployee() {

    // get data
    var name = document.getElementById("name").value;

    // TODO validate
    // then fail validate ==> return;

    var employee = {
        name: name
    };

    $.ajax({
        url: 'http://localhost:8080/api/v1/departments',
        type: 'POST',
        data: JSON.stringify(employee), // body
        contentType: "application/json", // type of body (json, xml, text)
        // dataType: 'json', // datatype return
        success: function(data, textStatus, xhr) {
            hideModal();
            showSuccessAlert();
            buildTable();
        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}


function openUpdateModal(id) {

    // get index from employee's id
    var index = departments.findIndex(x => x.id == id);

    // fill data
    document.getElementById("id").value = departments[index].id;
    document.getElementById("name").value = departments[index].name;

    openModal();
}

function save() {
    var id = document.getElementById("id").value;

    if (id == null || id == "") {
        addEmployee();
    } else {
        updateEmployee();
    }
}

function updateEmployee() {
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;

    // TODO validate
    // then fail validate ==> return;

    var department = {
        name: name
    };

    $.ajax({
        url: 'http://localhost:8080/api/v1/departments/' + id,
        type: 'PUT',
        data: JSON.stringify(department),
        contentType: "application/json",
        success: function(result) {
            // success
            hideModal();
            showSuccessAlert();
            buildTable();
        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}


function openConfirmDelete(id) {
    // get index from employee's id
    var index = departments.findIndex(x => x.id == id);
    var name = departments[index].name;

    var result = confirm("Want to delete " + name + "?");
    if (result) {
        deleteEmployee(id);
    }
}

function deleteEmployee(id) {
    // TODO validate
    $.ajax({
        url: 'http://localhost:8080/api/v1/departments/' + id,
        type: 'DELETE',
        success: function(result) {
            // success
            showSuccessAlert();
            buildTable();
        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function showSuccessAlert() {
    $("#success-alert").fadeTo(2000, 500).slideUp(500, function() {
        $("#success-alert").slideUp(500);
    });
}