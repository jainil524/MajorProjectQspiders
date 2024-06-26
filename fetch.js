fetch("https://golive.qspiders.com/api/student/student-data", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,gu;q=0.8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://student.qspiders.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "OPTIONS"
}).then(response => {
    return response.json();
}).then(data => {
    console.log(data);
}).catch(err => {
    console.error(err);
});
