let courseName = document.getElementById('courseName');
let courseCategory = document.getElementById('courseCategory');
let coursePrice = document.getElementById('coursePrice');
let courseDescription = document.getElementById('courseDescription');
let courseCapacity = document.getElementById('courseCapacity');
let addbtn = document.getElementById('click');
let deleteBtn=document.getElementById('deleteBtn');
let search = document.getElementById('search');
let currentIndex =0
let courses
if( JSON.parse(localStorage.getItem('courses'))==null){
    courses = []
}else {
    courses = JSON.parse(localStorage.getItem('courses'))
    displayData()
}

//create course
addbtn.onclick= function(event){
    event.preventDefault();
    if(addbtn.value=='Add Course'){
        addCourse()
        displayData()
        clearInput()

    }else{
        updateCourse()
        displayData()
        clearInput()

        courseName.classList.remove('is-valid')
        courseCategory.classList.remove('is-valid')
        coursePrice.classList.remove('is-valid')
        courseDescription.classList.remove('is-valid')
        courseCapacity.classList.remove('is-valid')

    }
  
}
//Add Course
function addCourse(){
    let course = {
        courseName:courseName.value,
        courseCategory:courseCategory.value,
        coursePrice:coursePrice.value,
        courseDescription:courseDescription.value,
        courseCapacity:courseCapacity.value
    }
    courses.push(course)
    localStorage.setItem('courses',JSON.stringify(courses))
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Course added Successfully',
        showConfirmButton: false,
        timer: 1500
    })

}
//clear input
function clearInput(){
    courseName:courseName.value =''
    courseCategory:courseCategory.value=''
    coursePrice:coursePrice.value=''
    courseDescription:courseDescription.value=''
    courseCapacity:courseCapacity.value=''
}
//Data in Table
function displayData(){
    let result ='';
    for(let i=0; i<courses.length;i++){
        result+=`
        <tr>
                <td>${i+1}</td>
                <td>${courses[i].courseName}</td>
                <td>${courses[i].courseCategory}</td>
                <td>${courses[i].coursePrice}</td>
                <td>${courses[i].courseDescription}</td>
                <td>${courses[i].courseCapacity}</td>
                <td><button class="btn btn-info" onclick="getCourse(${i})">Update</button></td>
                <td><button class="btn btn-danger" onclick="deleteCourse(${i})">Delete</button></td>

            </tr>
            `
    }
    data.innerHTML=result;
}
//Delete
function deleteCourse(index){
   

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                courses.splice(index,1)
                localStorage.setItem('courses',JSON.stringify(courses))

                displayData()
            Swal.fire(
                'Deleted!',
                'Course has been deleted.',
                'success'
            )
            }
        })
}

//delete All
deleteBtn.onclick = function(){

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            courses=[];
            localStorage.setItem('courses',JSON.stringify(courses))

            data.innerHTML='';
        Swal.fire(
            'Deleted!',
            'All Data has been deleted.',
            'success'
        )
        }
    })
}
//search
search.onkeyup = function (){

    let result ='';
    for(let i=0; i<courses.length;i++){
        if(courses[i].courseName.toLowerCase().includes(search.value.toLowerCase())){
            result+=`
            <tr>
                    <td>${i+1}</td>
                    <td>${courses[i].courseName}</td>
                    <td>${courses[i].courseCategory}</td>
                    <td>${courses[i].coursePrice}</td>
                    <td>${courses[i].courseDescription}</td>
                    <td>${courses[i].courseCapacity}</td>
                    <td><button class="btn btn-info">Update</button></td>
                    <td><button class="btn btn-danger" onclick="deleteCourse()">Delete</button></td>

                </tr>
                `
        }
    }
    data.innerHTML=result;
}

//Update
function getCourse(index){
    let course = courses[index]
    courseName:courseName.value =course.courseName
    courseCategory:courseCategory.value=course.courseCategory
    coursePrice:coursePrice.value=course.coursePrice
    courseDescription:courseDescription.value=course.courseDescription
    courseCapacity:courseCapacity.value=course.courseCapacity
    
    addbtn.value='Update Course'
    currentIndex=index
}

function updateCourse(){
    let course = {
        courseName:courseName.value ,
        courseCategory:courseCategory.value,
        coursePrice:coursePrice.value,
        courseDescription:courseDescription.value,
        courseCapacity:courseCapacity.value
    }
    let name =courses[currentIndex].courseName
    courses[currentIndex].courseName = course.courseName
    courses[currentIndex].courseCategory = course.courseCategory
    courses[currentIndex].coursePrice = course.coursePrice
    courses[currentIndex].courseDescription = course.courseDescription
    courses[currentIndex].courseCapacity = course.courseCapacity
    localStorage.setItem('courses',JSON.stringify(courses))

    addbtn.value ='Add Course'
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${name} Updated Successfully`,
        showConfirmButton: false,
        timer: 1500
    })

}
//course Name
courseName.onkeyup = function(){
    let pattern =/^[A-Z][a-z\s]{2,10}$/
    if(pattern.test(courseName.value)){
        if(courseName.classList.contains('is-invalid')
        && document.getElementById('Alert').classList.contains('d-block') )
        {

            courseName.classList.replace('is-invalid','is-valid')
            document.getElementById('Alert').classList.replace('d-block','d-none')
        }else
        courseName.classList.add('is-valid')
        addbtn.removeAttribute('disabled')
    } else{
        if(courseName.classList.contains('is-valid')
        && document.getElementById('Alert').classList.contains('d-none'))

        {
            document.getElementById('Alert').classList.replace('d-none','d-block')

            courseName.classList.replace('is-valid','is-invalid')
        }else
        courseName.classList.add('is-invalid')
        document.getElementById('Alert').classList.replace('d-none','d-block')

        addbtn.setAttribute('disabled','disabled')
    }
}
//Category

courseCategory.onkeyup = function(){
    let pattern =/^[A-Z][a-z]{2,20}$/
    if(pattern.test(courseCategory.value)){
        if(courseCategory.classList.contains('is-invalid')
        && document.getElementById('Alert2').classList.contains('d-block') )
        {
            courseCategory.classList.replace('is-invalid','is-valid')
            document.getElementById('Alert2').classList.replace('d-block','d-none')
        }else
        courseCategory.classList.add('is-valid')
        addbtn.removeAttribute('disabled')
    } else{
        if(courseCategory.classList.contains('is-valid')
        && document.getElementById('Alert2').classList.contains('d-none'))
        {
            courseCategory.classList.replace('is-valid','is-invalid')
        }else
        courseCategory.classList.add('is-invalid')
        document.getElementById('Alert2').classList.replace('d-none','d-block')
        addbtn.setAttribute('disabled','disabled')
    }
}
//price
coursePrice.onkeyup = function(){
    let pattern =/^[0-9]{3,4}$/
    if(pattern.test(coursePrice.value)){
        if(coursePrice.classList.contains('is-invalid')
        && document.getElementById('Alert3').classList.contains('d-block') )
        {
            coursePrice.classList.replace('is-invalid','is-valid')
            document.getElementById('Alert3').classList.replace('d-block','d-none')
        }else
        coursePrice.classList.add('is-valid')
        addbtn.removeAttribute('disabled')
    } else{
        if(coursePrice.classList.contains('is-valid')
        && document.getElementById('Alert3').classList.contains('d-none'))

        {
            document.getElementById('Alert3').classList.replace('d-none','d-block')
            coursePrice.classList.replace('is-valid','is-invalid')
        }else
        coursePrice.classList.add('is-invalid')
        document.getElementById('Alert3').classList.replace('d-none','d-block')
        addbtn.setAttribute('disabled','disabled')
    }
}

//Description
courseDescription.onkeyup = function(){
    let pattern =/^[A-Z][A-Za-z0-9\s]{3,120}$/
    if(pattern.test(courseDescription.value)){
        if(courseDescription.classList.contains('is-invalid')){
            courseDescription.classList.replace('is-invalid','is-valid')
        }else
        courseDescription.classList.add('is-valid')
        addbtn.removeAttribute('disabled')
    } else{
        if(courseDescription.classList.contains('is-valid')){
            courseDescription.classList.replace('is-valid','is-invalid')
        }else
        courseDescription.classList.add('is-invalid')
        addbtn.setAttribute('disabled','disabled')
    }
}
//Capacity
courseCapacity.onkeyup = function(){
    let pattern =/^[0-9]{2,3}$/
    if(pattern.test(courseCapacity.value)){
        if(courseCapacity.classList.contains('is-invalid')){
            courseCapacity.classList.replace('is-invalid','is-valid')
        }else
        courseCapacity.classList.add('is-valid')
        addbtn.removeAttribute('disabled')
    } else{
        if(courseDcourseCapacityescription.classList.contains('is-valid')){
            courseCapacity.classList.replace('is-valid','is-invalid')
        }else
        courseCapacity.classList.add('is-invalid')
        addbtn.setAttribute('disabled','disabled')
    }
}