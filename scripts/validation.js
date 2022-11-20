const age = localStorage.getItem("age");

!age && window.location.replace("./age.html");
age === "false" && window.location.replace("./failure.html");
