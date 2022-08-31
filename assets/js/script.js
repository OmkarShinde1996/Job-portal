

document.querySelector('.search-btn').addEventListener('click', () => {
    let text = document.querySelector('.search-input').value//getting value entered in search box
    getJobs().then(jobs => {
        let filteredJobs = filterJobs(jobs,text)
        showJobs(filteredJobs)
        document.querySelector('.number-of-jobs').innerText = `Showing ${filteredJobs.length} Jobs`
    })
})

function getJobs(){
    return fetch('./assets/data/data.json').then(response => response.json()).then(data => data)
}

getJobs().then(data => showJobs(data)) //calling getJobs which will return Promis from wwhich we are retriving the data and passing it to showJobs

function filterJobs(jobs, searchText){
    if(searchText){
        let filterItems = jobs.filter(job => {
            if(job.roleName.toLowerCase().includes(searchText) || 
            job.type.toLowerCase().includes(searchText) ||
            job.company.toLowerCase().includes(searchText) ||
            job.location.toLowerCase().includes(searchText) ||
            job.serLevel.toLowerCase().includes(searchText) ||
            job.requirements.content.toLowerCase().includes(searchText)){
                return true
            }else{
                return false
            }
        })
        return filterItems
    }else{
        return jobs
    }
}


function showJobs(jobs){
    // console.log(jobs)
    let jobsContainer = document.querySelector('.jobs-container') //grabbing the jobs container
    let jobsHTML = ''
    
    jobs.forEach(job => {//creating the HTML card part for each job from jobs array/object list
        jobsHTML += `
        <div class="col col-lg-5 col-xl-3 col-md-6 col-sm-15">
            <div class="card h-100">
                <div class="card-body">
                    <div class="logo-box mb-2">
                        <img src="${job.logo}" srcset="">
                    </div>
                    <h6 class="text-uppercase">${job.company}</h6>
                    <h5 class="card-title text-truncate">${job.roleName}</h5>
                    <div class="description mb-3">
                        <p class="card-text">${job.requirements.content}</p>
                    </div>
                    <div class="container tags">
                        <div class="row tags-row">
                            <div class="col tags job-type-tag px-0 pe-1">
                                <div class="tags-container"><small>${job.type}</small></div>
                            </div>
                            <div class="col tags seniority-level-tag px-0 pe-1">
                                <div class="tags-container"><small>${job.serLevel}</small></div>
                            </div>
                            <div class="col tags experience-tag px-0">
                                <div class="tags-container"><small>${job.expLevel}</small></div>
                            </div>
                        </div>
                    </div>
                    <div class="container text-center my-2">
                        <div class="row row-cols-1 row-cols-sm-2 mt-2">
                            <div class="col"><a href="#" class="btn btn-primary apply-btn">Apply Now</a></div>
                            <div class="col"><a href="#" class="btn btn-primary message-btn">Message</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    })
    // console.log(jobsHTML)
    jobsContainer.innerHTML = jobsHTML
}

