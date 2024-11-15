// script.js
document.addEventListener("DOMContentLoaded", async () => {
    const descriptionSelect = document.getElementById("description");
    const prefixInput = document.getElementById("prefix");

    try {
        // Fetch data from JSON
        const response = await fetch("data.json");
        if (!response.ok) {
            throw new Error(`Failed to load data.json: ${response.statusText}`);
        }
        const data = await response.json();

        // Populate description select options
        data.forEach(item => {
            const option = document.createElement("option");
            option.value = item.description;
            option.textContent = item.description;
            descriptionSelect.appendChild(option);
        });

        // Event listener for selecting a description
        descriptionSelect.addEventListener("change", () => {
            const selectedDescription = descriptionSelect.value;
            const selectedData = data.find(item => item.description === selectedDescription);

            if (selectedData) {
                // Ensure prefix is treated as an array
                const prefixes = Array.isArray(selectedData.prefix) ? selectedData.prefix : [selectedData.prefix];
                prefixInput.value = prefixes.join("; ");
            } else {
                prefixInput.value = ""; // Clear input if no valid data
            }
        });

        // Event listener for typing a GS1 prefix
        prefixInput.addEventListener("input", () => {
            const inputPrefix = prefixInput.value.trim();
            const matchingData = data.find(item =>
                Array.isArray(item.prefix)
                    ? item.prefix.some(prefix => prefix.startsWith(inputPrefix))
                    : item.prefix.startsWith(inputPrefix)
            );

            if (matchingData) {
                descriptionSelect.value = matchingData.description;
            } else {
                descriptionSelect.value = ""; // Clear selection if no match
            }
        });
    } catch (error) {
        console.error("Error loading or processing data:", error);
        alert("Failed to load or process data. Please check the console for details.");
    }
});
