const dropZone = document.querySelector(".drop-zone");
const fileInput = document.querySelector("#fileInput");
const browseBtn = document.querySelector("#browseBtn");

const progressContainer = document.querySelector(".progress-container");
const bgProgress = document.querySelector(".bg-progress");
const progressBar = document.querySelector(".progress-bar");
const percentDiv = document.querySelector("#percent");

const sharingContainer = document.querySelector(".sharing-container");
const fileURLInput = document.querySelector("#fileURL");
const copyBtn = document.querySelector("#copyBtn");

const emailForm = document.querySelector("#emailForm");

const host = "https://sharequick.herokuapp.com/";
const uploadURL = host + "api/files";
const emailURL = `${host}api/files/send`;
// const uploadURL = `${host} + api/files`
dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (!dropZone.classList.contains("dragged")) {

        dropZone.classList.add("dragged");
    }
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragged");
    const files = e.dataTransfer.files;
    console.log(files);
    if (files.length) {
        fileInput.files = files;
        uploadFile()
    }
});

copyBtn.addEventListener("click", () => {
    fileURLInput.select()
    document.execCommand("copy")
})

fileInput.addEventListener("change", () => {
    uploadFile()
})

browseBtn.addEventListener("click", () => {
    fileInput.click()
});


const uploadFile = () => {
    progressContainer.style.display = "block";
    const file = fileInput.files[0]
    const formData = new FormData()
    formData.append("myfile", file)

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.response);
            onUploadSuccess(JSON.parse(xhr.response))
        }
    };

    xhr.upload.onprogress = updateProgress;

    xhr.open("POST", uploadURL);
    xhr.send(formData)
};

const updateProgress = (e) => {
    const percent = Math.round((e.loaded / e.total) * 100);
    // console.log(percent);
    bgProgress.style.width = `${percent}%`;
    percentDiv.innerText = percent;
    progressBar.style.transform = `scaleX(${percent / 100})`
};

const onUploadSuccess = ({ file: url }) => {
    console.log(url);
    fileInput.value = "";
    emailForm[2].removeAttribute("disabled");
    progressContainer.style.display = "none";
    sharingContainer.style.display = "block";
    fileURLInput.value = url;
};

emailForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Submit form");
    const url = fileURLInput.value;
    const formData = {
        uuid: url.split("/").splice(-1, 1)[0],
        emailTo: emailForm.elements["to-email"].value,
        emailForm: emailForm.elements["from-email"].value,
    };
    emailForm[2].setAttribute("disabled", "true");
    console.table(formData);



    fetch(emailURL, {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then((res) => res.json())
        .then(({success}) => {
            if (success) {
                sharingContainer.style.display = "none";
            }
        });
});