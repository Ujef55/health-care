let fetchedData;
let patientName = 'Jessica Taylor';
const listItemsUls = document.getElementById('list-item-uls');
const bloodPressureSystolicValue = document.getElementById('blood-pressure-systolic-value');
const bloodPressureDiastolicValue = document.getElementById('blood-pressure-diastolic-value');
const bloodPressureSystolicLevel = document.getElementById('blood-pressure-systolic-level');
const bloodPressureDiastolicLevel = document.getElementById('blood-pressure-diastolic-level')

const diagnosticListUls = document.querySelector('.diagnostic-list-uls');

const patientInfoPicture = document.querySelector('.patient-info-picture');
const patientInfoTitle = document.getElementById('patient-info-title');
const dateOfBirth = document.getElementById('date-of-birth');
const gender = document.getElementById('gender');
const contactInfo = document.getElementById('contact-info');
const emergencyContactInfo = document.getElementById('emergency-contact-info');
const insuranceProvider = document.getElementById('insurance-provider');

const labResultsUls = document.querySelector('.lab-results-uls');

const heartRateLevelDiv = document.getElementById('heart-rate-level-div');
const respiratoryLevelDiv = document.getElementById('respiratory-level-div');
const temperatureLevelDiv = document.getElementById('temperature-level-div');

const systolicLevelDiv = document.getElementById('systolic-level-div');
const diastolicLevelDiv = document.getElementById('diastolic-level-div');





(function () {
    const apiUrl = config.API_URL;
    const username = config.USERNAME;
    const password = config.PASSWORD;

    const credentials = btoa(`${username}:${password}`);

    fetch(apiUrl, {
        headers: {
            'Authorization': `Basic ${credentials}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('response was not ok');
            }
            return response.json();
        })
        .then(data => {
            fetchedData = data;
            showAsideList(fetchedData);
            showChart(fetchedData);
            showBloodPressureData(fetchedData);
            showBloodPressureCardData(fetchedData);
            showDiagnosticList(fetchedData);
            showpateintCard(fetchedData);
            showLabResults(fetchedData);
        })
        .catch(err => {
            console.error('Error in fetching data', err);
        })
})();



// showing data for each patient into sidebar
function showAsideList(data) {
    data.forEach(item => {

        const lis = document.createElement('li');
        lis.classList.add('list-item');


        lis.innerHTML = `<div class="Patient-name-group">
                <img src=${item.profile_picture} alt="" class="list-item-profile-picture" />
                <div class="name-age">
                  <span class="body-emphasized-14pt patient-name">${item.name}</span>
                  <span class="body-secondary-info-14pt">${item.gender}, ${item.age}</span>
                </div>
              </div>
              <div class="horiz-dots">
                <img
                  src="Assets/more_horiz_FILL0_wght300_GRAD0_opsz24.svg"
                  alt=""
                />
              </div>`

        lis.addEventListener('click', () => {
            // Remove active class from all lis
            const activeLis = document.querySelectorAll('.list-item.active-list-item');
            activeLis.forEach(li => {
                li.classList.remove('active-list-item');
            });

            // Add active class to the clicked li
            lis.classList.add('active-list-item');

            // Update patientName to the clicked item's name
            patientName = item.name;
            showBloodPressureData(data);
            showBloodPressureCardData(data);
            showChart(data);
            showDiagnosticList(data);
            showpateintCard(data);
            showLabResults(data);
        });


        if (item.name === patientName) {
            lis.classList.add('active-list-item');
        }

        listItemsUls.appendChild(lis);
    });
}

function showBloodPressureData(data) {

    // Clear prev data
    bloodPressureSystolicValue.innerText = '';
    bloodPressureDiastolicValue.innerText = '';
    systolicLevelDiv.innerHTML = '';
    diastolicLevelDiv.innerHTML = '';

    data.forEach(item => {
        if (item.name === patientName) {
            bloodPressureSystolicValue.innerText = item.diagnosis_history[0].blood_pressure.systolic.value;

            bloodPressureDiastolicValue.innerText = item.diagnosis_history[0].blood_pressure.diastolic.value;

            // systolic
            if (item.diagnosis_history[0].blood_pressure.systolic.levels === 'Higher than Average') {
                const arrowLogoSpan = document.createElement('span');
                const arrowLogoImg = document.createElement('img');
                arrowLogoSpan.appendChild(arrowLogoImg);
                systolicLevelDiv.appendChild(arrowLogoSpan);
                arrowLogoImg.src = 'Assets/ArrowUp.svg';

                const systolicLevelSpan = document.createElement('span');
                systolicLevelSpan.textContent = item.diagnosis_history[0].blood_pressure.systolic.levels;
                systolicLevelDiv.appendChild(systolicLevelSpan);
            } else if (item.diagnosis_history[0].blood_pressure.systolic.levels === 'Lower than Average') {
                const arrowLogoSpan = document.createElement('span');
                const arrowLogoImg = document.createElement('img');
                arrowLogoSpan.appendChild(arrowLogoImg);
                systolicLevelDiv.appendChild(arrowLogoSpan);
                arrowLogoImg.src = 'Assets/ArrowDown.svg';

                const systolicLevelSpan = document.createElement('span');
                systolicLevelSpan.textContent = item.diagnosis_history[0].blood_pressure.systolic.levels;
                systolicLevelDiv.appendChild(systolicLevelSpan);
            } else if (item.diagnosis_history[0].blood_pressure.systolic.levels === 'Normal') {
                const systolicLevelSpan = document.createElement('span');
                systolicLevelSpan.textContent = item.diagnosis_history[0].blood_pressure.systolic.levels;
                systolicLevelDiv.appendChild(systolicLevelSpan);
            }



            if (item.diagnosis_history[0].blood_pressure.diastolic.levels === 'Higher than Average') {
                const arrowLogoSpan = document.createElement('span');
                const arrowLogoImg = document.createElement('img');
                arrowLogoSpan.appendChild(arrowLogoImg);
                diastolicLevelDiv.appendChild(arrowLogoSpan);
                arrowLogoImg.src = 'Assets/ArrowUp.svg';

                const diastolicLevelSpan = document.createElement('span');
                diastolicLevelSpan.textContent = item.diagnosis_history[0].blood_pressure.diastolic.levels;
                diastolicLevelDiv.appendChild(diastolicLevelSpan);
            } else if (item.diagnosis_history[0].blood_pressure.diastolic.levels === 'Lower than Average') {
                const arrowLogoSpan = document.createElement('span');
                const arrowLogoImg = document.createElement('img');
                arrowLogoSpan.appendChild(arrowLogoImg);
                diastolicLevelDiv.appendChild(arrowLogoSpan);
                arrowLogoImg.src = 'Assets/ArrowDown.svg';

                const diastolicLevelSpan = document.createElement('span');
                diastolicLevelSpan.textContent = item.diagnosis_history[0].blood_pressure.diastolic.levels;
                diastolicLevelDiv.appendChild(diastolicLevelSpan);
            } else if (item.diagnosis_history[0].blood_pressure.diastolic.levels === 'Normal') {
                const diastolicLevelSpan = document.createElement('span');
                diastolicLevelSpan.textContent = item.diagnosis_history[0].blood_pressure.diastolic.levels;
                diastolicLevelDiv.appendChild(diastolicLevelSpan);
            }
        }
    })
}

function showBloodPressureCardData(data) {

    // clearing prev data
    document.getElementById('respiratory-value').textContent = '';
    document.getElementById('temperature-value').textContent = '';
    document.getElementById('heart-rate-value').textContent = '';
    respiratoryLevelDiv.innerHTML = '';
    temperatureLevelDiv.innerHTML = '';
    heartRateLevelDiv.innerHTML = '';

    data.forEach(item => {
        if (item.name === patientName) {
            // respiratory-value
            document.getElementById('respiratory-value').textContent = `${item.diagnosis_history[0].respiratory_rate.value} bpm`;

            if (item.diagnosis_history[0].respiratory_rate.levels === 'Higher than Average') {
                const arrowLogoSpan = document.createElement('span');
                const arrowLogoImg = document.createElement('img');
                arrowLogoSpan.appendChild(arrowLogoImg);
                respiratoryLevelDiv.appendChild(arrowLogoSpan);
                arrowLogoImg.src = 'Assets/ArrowUp.svg';

                const respiratoryLevelSpan = document.createElement('span');
                respiratoryLevelSpan.textContent = item.diagnosis_history[0].respiratory_rate.levels;
                respiratoryLevelDiv.appendChild(respiratoryLevelSpan);

            } else if (item.diagnosis_history[0].respiratory_rate.levels === 'Lower than Average') {
                const arrowLogoSpan = document.createElement('span');
                const arrowLogoImg = document.createElement('img');
                arrowLogoSpan.appendChild(arrowLogoImg);
                respiratoryLevelDiv.appendChild(arrowLogoSpan);
                arrowLogoImg.src = 'Assets/ArrowDown.svg';

                const respiratoryLevelSpan = document.createElement('span');
                respiratoryLevelSpan.textContent = item.diagnosis_history[0].respiratory_rate.levels;
                respiratoryLevelDiv.appendChild(respiratoryLevelSpan);
            } else if (item.diagnosis_history[0].respiratory_rate.levels === 'Normal') {
                const respiratoryLevelSpan = document.createElement('span');
                respiratoryLevelSpan.textContent = item.diagnosis_history[0].respiratory_rate.levels;
                respiratoryLevelDiv.appendChild(respiratoryLevelSpan);
            }



            // temperature-value
            document.getElementById('temperature-value').textContent = `${item.diagnosis_history[0].temperature.value}°F`

            if (item.diagnosis_history[0].temperature.levels === 'Higher than Average') {
                const arrowLogoSpan = document.createElement('span');
                const arrowLogoImg = document.createElement('img');
                arrowLogoSpan.appendChild(arrowLogoImg);
                temperatureLevelDiv.appendChild(arrowLogoSpan);
                arrowLogoImg.src = 'Assets/ArrowUp.svg';

                const temperatureLevelSpan = document.createElement('span');
                temperatureLevelSpan.textContent = item.diagnosis_history[0].temperature.levels;
                temperatureLevelDiv.appendChild(temperatureLevelSpan);

            } else if (item.diagnosis_history[0].temperature.levels === 'Lower than Average') {
                const arrowLogoSpan = document.createElement('span');
                const arrowLogoImg = document.createElement('img');
                arrowLogoSpan.appendChild(arrowLogoImg);
                temperatureLevelDiv.appendChild(arrowLogoSpan);
                arrowLogoImg.src = 'Assets/ArrowDown.svg';

                const temperatureLevelSpan = document.createElement('span');
                temperatureLevelSpan.textContent = item.diagnosis_history[0].temperature.levels;
                temperatureLevelDiv.appendChild(temperatureLevelSpan);
            } else if (item.diagnosis_history[0].temperature.levels === 'Normal') {
                const temperatureLevelSpan = document.createElement('span');
                temperatureLevelSpan.textContent = item.diagnosis_history[0].temperature.levels;
                temperatureLevelDiv.appendChild(temperatureLevelSpan);
            }


            document.getElementById('heart-rate-value').textContent = `${item.diagnosis_history[0].heart_rate.value} bpm`;


            if (item.diagnosis_history[0].heart_rate.levels === 'Higher than Average') {
                const arrowLogoSpan = document.createElement('span');
                const arrowLogoImg = document.createElement('img');
                arrowLogoSpan.appendChild(arrowLogoImg);
                heartRateLevelDiv.appendChild(arrowLogoSpan);
                arrowLogoImg.src = 'Assets/ArrowUp.svg';

                const heartRateLevelSpan = document.createElement('span');
                heartRateLevelSpan.textContent = item.diagnosis_history[0].heart_rate.levels;
                heartRateLevelDiv.appendChild(heartRateLevelSpan);
            } else if (item.diagnosis_history[0].heart_rate.levels === 'Lower than Average') {
                const arrowLogoSpan = document.createElement('span');
                const arrowLogoImg = document.createElement('img');
                arrowLogoSpan.appendChild(arrowLogoImg);
                heartRateLevelDiv.appendChild(arrowLogoSpan);
                arrowLogoImg.src = 'Assets/ArrowDown.svg';

                const heartRateLevelSpan = document.createElement('span');
                heartRateLevelSpan.textContent = item.diagnosis_history[0].heart_rate.levels;
                heartRateLevelDiv.appendChild(heartRateLevelSpan);
            } else if (item.diagnosis_history[0].heart_rate.levels === 'Normal') {
                const heartRateLevelSpan = document.createElement('span');
                heartRateLevelSpan.textContent = item.diagnosis_history[0].heart_rate.levels;
                heartRateLevelDiv.appendChild(heartRateLevelSpan);
            }
        }
    })
}

// Show chart
let myChart = null;
function showChart(patientData) {
    const ctx = document.getElementById("myChart").getContext("2d");

    const labels = [
        "Oct 2023",
        "Nov 2023",
        "Dec 2023",
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
    ];

    let systolicData = [];
    let diastolicData = [];

    // Clear previous chart data
    if (myChart) {
        myChart.destroy();
    }

    patientData.forEach(item => {
        if (item.name === patientName) {
            item.diagnosis_history.forEach(month => {
                const systolicValue = month.blood_pressure.systolic.value;
                const diastolicValue = month.blood_pressure.diastolic.value;
                systolicData.push(systolicValue);
                diastolicData.push(diastolicValue);
            });
        }
    });

    const firstSixReversedSystolic = systolicData.slice(0, 6).reverse();
    const firstSixReversedDiastolic = diastolicData.slice(0, 6).reverse();

    const data = {
        labels: labels.slice(0, 6).reverse(),
        datasets: [
            {
                data: firstSixReversedSystolic,
                label: "Systolic",
                borderColor: '#e66fd2',
                tension: 0.1
            },
            {
                data: firstSixReversedDiastolic,
                label: "Diastolic",
                borderColor: 'rgb(153, 102, 255)',
                tension: 0.1
            },
        ],
    };

    const config = {
        type: "line",
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Month'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Pressure (mmHg)'
                    }
                }
            }
        },
    };

    myChart = new Chart(ctx, config);
}


// show diagnostic list
function showDiagnosticList(data) {


    // clear prev data
    diagnosticListUls.innerHTML = '';

    data.forEach(item => {
        if (item.name === patientName) {
            item.diagnostic_list.forEach(list => {

                const diagnosticListItem = document.createElement('li');
                diagnosticListItem.classList.add('diagnostic-list-item');

                const diagnosticListName = document.createElement('span');
                diagnosticListName.textContent = list.name;
                diagnosticListName.classList.add('text-column', 'problems');

                const diagnosticListDescription = document.createElement('span');
                diagnosticListDescription.textContent = list.description;
                diagnosticListDescription.classList.add('text-column', 'description');

                const diagnosticListStatus = document.createElement('span');
                diagnosticListStatus.textContent = list.status;
                diagnosticListStatus.classList.add('text-column', 'status');

                diagnosticListItem.appendChild(diagnosticListName);
                diagnosticListItem.appendChild(diagnosticListDescription);
                diagnosticListItem.appendChild(diagnosticListStatus);

                const horizLine = document.createElement('hr');
                diagnosticListUls.appendChild(diagnosticListItem);
                diagnosticListUls.appendChild(horizLine);
            })
        }
    })
}

// show pateint card data
function showpateintCard(data) {

    function convertDate(inputDate) {
        const date = new Date(inputDate);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    }
    data.forEach(item => {
        if (item.name === patientName) {
            patientInfoPicture.src = item.profile_picture;
            patientInfoTitle.textContent = item.name;
            dateOfBirth.textContent = convertDate(item.date_of_birth);
            gender.textContent = item.gender;
            const genderLogo = document.getElementById('gender-logo');

            if (item.gender == 'Male') {
                genderLogo.src = 'Assets/MaleIcon.svg';
            } else {
                genderLogo.src = 'Assets/FemaleIcon.svg';
            }
            contactInfo.textContent = item.phone_number;
            emergencyContactInfo.textContent = item.emergency_contact;
            insuranceProvider.textContent = item.insurance_type
        }
    }
    )

}

// show lab-results
function showLabResults(data) {


    // Clear previous lab results
    labResultsUls.innerHTML = '';

    // labResultsUls
    data.forEach(item => {
        if (item.name === patientName) {
            item.lab_results.forEach(result => {
                const lis = document.createElement('li');
                const title = document.createElement('span');
                title.textContent = result;
                const download = document.createElement('span');
                const downloadImg = document.createElement('img');
                downloadImg.src = 'Assets/download_FILL0_wght300_GRAD0_opsz24 (1).svg';


                lis.appendChild(title);
                download.appendChild(downloadImg);
                lis.appendChild(download);

                labResultsUls.appendChild(lis);
            })
        }
    })
}











