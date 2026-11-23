const statLeaders = {
    points: {
        label: "Points per game",
        players: [
            { id: "luka", name: "Luka Doncic", value: 39.3 },
            { id: "anthony", name: "Anthony Edwards", value: 33.2 },
            { id: "curry", name: "Stephen Curry", value: 30.6 },
            { id: "victor", name: "Victor Wembanyama", value: 30.1 },
            { id: "shai", name: "Shai Gilgeous-Alexander", value: 29.5 }
        ]
    },
    rebounds: {
        label: "Rebounds per game",
        players: [
            { id: "towns", name: "Karl-Anthony Towns", value: 13.8 },
            { id: "sabonis", name: "Domantas Sabonis", value: 13.3 },
            { id: "giannis", name: "Giannis Antetokounmpo", value: 12.6 },
            { id: "gobert", name: "Rudy Gobert", value: 12.1 },
            { id: "victor", name: "Victor Wembanyama", value: 11.9 }
        ]
    },
    assists: {
        label: "Assists per game",
        players: [
            { id: "haliburton", name: "Tyrese Haliburton", value: 9.5 },
            { id: "jokic", name: "Nikola Jokic", value: 9.1 },
            { id: "trae", name: "Trae Young", value: 8.7 },
            { id: "franz", name: "Franz Wagner", value: 8.6 },
            { id: "davion", name: "Davion Mitchell", value: 8.5 }
        ]
    }
};

const compareForm = document.querySelector("#compare-form");

if (compareForm) {
    const categorySelect = document.querySelector("#stat-category");
    const firstSelect = document.querySelector("#player-one");
    const secondSelect = document.querySelector("#player-two");
    const message = document.querySelector("#compare-message");
    const statName = document.querySelector("#stat-name");
    const firstValue = document.querySelector("#first-stat");
    const secondValue = document.querySelector("#second-stat");

    const populatePlayerOptions = (select, players) => {
        select.replaceChildren(...players.map((player) => {
            const option = document.createElement("option");
            option.value = player.id;
            option.textContent = player.name;
            return option;
        }));
    };

    const updateCategory = () => {
        const leaders = statLeaders[categorySelect.value].players;
        populatePlayerOptions(firstSelect, leaders);
        populatePlayerOptions(secondSelect, leaders);
        secondSelect.selectedIndex = 1;
        message.textContent = "";
        updateComparison();
    };

    const updateComparison = () => {
        const leaders = statLeaders[categorySelect.value];
        const firstPlayer = leaders.players.find((player) => player.id === firstSelect.value);
        const secondPlayer = leaders.players.find((player) => player.id === secondSelect.value);

        statName.textContent = leaders.label;
        document.querySelector("#first-player-heading").textContent = firstPlayer.name;
        document.querySelector("#second-player-heading").textContent = secondPlayer.name;
        firstValue.textContent = firstPlayer.value;
        secondValue.textContent = secondPlayer.value;
    };

    categorySelect.addEventListener("change", updateCategory);
    firstSelect.addEventListener("change", updateComparison);
    secondSelect.addEventListener("change", updateComparison);

    compareForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (firstSelect.value === secondSelect.value) {
            message.textContent = "Choose two different players to compare.";
            return;
        }

        updateComparison();
        const leaders = statLeaders[categorySelect.value];
        const firstPlayer = leaders.players.find((player) => player.id === firstSelect.value);
        const secondPlayer = leaders.players.find((player) => player.id === secondSelect.value);
        message.textContent = `${firstPlayer.name} and ${secondPlayer.name} are ready to compare.`;
    });
}