// calculate time offsets
function calcHourOffset(timezone, hour) {
  let userTime = new Date();
  userTime.setHours(hour);
  userTime.setMinutes(0);
  userTime.setSeconds(0);
  userTime.setMilliseconds(0);
  return userTime.toLocaleTimeString("en-US", {
    hour12: false,
    timeZone: timezone,
  });
}

let observer = new MutationObserver(updateTimezone);

function updateTimezone() {
  //check if custom timezone already exists
  if (document.getElementById("customTimezone")) {
    return;
  } else {
    chrome.storage.sync.get("nttmTimezones", (res) => {
      let timezone;
      let nttmTimezones = res.nttmTimezones;

      nttmTimezones.forEach((timezone, i) => {
        //add GMT header
        let gmtContainer = document.getElementsByClassName("nL44Lb")[0];

        let gmtSlot = document.createElement("div");
        gmtSlot.classList.add("Gk2izd");
        gmtSlot.setAttribute("id", "customTimezone");

        let gmtText = document.createElement("div");
        gmtText.classList.add("w61Ns");
        gmtText.classList.add("pCoqfc");
        gmtText.innerHTML = timezone.gmt;

        gmtSlot.appendChild(gmtText);
        gmtContainer.appendChild(gmtSlot);

        // add GMT spacer
        let gmtSpacer = document.getElementsByClassName("ALy9T")[0];
        let gmtSpacerSlot = document.createElement("div");
        gmtSpacerSlot.classList.add("Pgg38c");
        gmtSpacerSlot.classList.add("Xc6hQ");
        gmtSpacerSlot.classList.add("TzA9Ye");
        gmtSpacerSlot.setAttribute("id", "customSpacer");

        let gmtSpacerFill = document.createElement("div");
        gmtSpacerFill.classList.add("lmNFmc");
        gmtSpacerFill.classList.add("pCoqfc");
        gmtSpacerFill.innerHTML = timezone.gmt;

        gmtSpacerSlot.appendChild(gmtSpacerFill);
        gmtSpacer.appendChild(gmtSpacerSlot);

        //add new times list
        let timesListContainer = document.getElementsByClassName("sx5BGe")[0];

        let timesList = document.createElement("div");
        timesList.classList.add("GENA3c");
        timesList.setAttribute("id", "customTimesList");
        timesList.style.marginLeft = "15px";

        for (let i = 0; i < 24; i++) {
          let timeSlot = document.createElement("div");
          timeSlot.classList.add("s4ZaLd");

          let timeText = document.createElement("span");
          timeText.classList.add("ebZ3od");
          timeText.classList.add("MANBAf");
          timeText.innerHTML = calcHourOffset(timezone.timezone, i).slice(0, 5);

          timeSlot.appendChild(timeText);
          timesList.appendChild(timeSlot);
        }

        timesListContainer.appendChild(timesList);
      });
    });
  }
}

setInterval(() => {
  updateTimezone();
  //   observer.observe(document.getElementById("YPCqFe"), {
  //     childList: true,
  //     subtree: true,
  //   });
}, 1000);
