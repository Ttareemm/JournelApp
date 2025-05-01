document.getElementById("generate").addEventListener("click", performAction);

function performAction() {
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    getWeatherData(zip).then((data) => {
        if (data) {
            const newEntry = {
                temp: data.main.temp,
                date: new Date().toLocaleDateString(),
                feel: feelings,
            };

            postData("/add", newEntry);
            updateUI();
        }
    });
}
const getWeatherData = async (zip) => {
    const apiKey = "YOUR_API_KEY&units=metric";
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`;

    const response = await fetch(baseUrl);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching weather data:", error);
    }
};
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    try {
        return await response.json();
    } catch (error) {
        console.log("Error posting data:", error);
    }
};
const updateUI = async () => {
    const request = await fetch("/all");

    try {
        const allData = await request.json();
        console.log(allData);

        document.getElementById("temp").innerHTML = `Temperature: ${Math.round(allData.temp)}°C`;
        document.getElementById("content").innerHTML = `Feeling: ${allData.feel}`;
        document.getElementById("date").innerHTML = `Date: ${allData.date}`;
    } catch (error) {
        console.log("Error updating UI:", error);
    }
};
