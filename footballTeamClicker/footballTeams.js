(function() {

    /* ======= Model ========*/
    var model = {
        
        isAdmin: true,
        currentTeam: null,
        teams: [
            {
                clickCount: 0,
                name: 'Arsenal',
                imgSrc: 'images/img1.jpeg'
            },
            {
                clickCount: 0,
                name: 'Machester City',
                imgSrc: 'images/img2.jpg'
            },
            {
                clickCount: 0,
                name: 'Real Madrid',
                imgSrc: 'images/img3.jpg'
            },
            {
                clickCount: 0,
                name: 'Germany National Team',
                imgSrc: 'images/img4.png'
            },
            {
                clickCount: 0,
                name: 'Portugal National Team',
                imgSrc: 'images/img5.png'
            },
        ]
    };

    /* ======= Octopus ========*/
    var octopus = {

        init: function() {
            // Set the current team to the first one in the list
            model.currentTeam = model.teams[0];

            // Tell views to initialize
            teamListView.init();
            teamView.init();
            adminView.init();
        }, 

        getCurrentTeam: function() {
            return model.currentTeam;
        },

        getAllTeams: function() {
            return model.teams
        },

        // Set the currently selected team in model to the team passed in
        setCurrentTeam: function(team) {
            model.currentTeam = team;
        },
        
        isAdmin: function() {
            return model.isAdmin;
        },

        // Incriments the click counter
        incrementCounter: function() {
            model.currentTeam.clickCount++;
            teamView.render();
        },

        // Update team details
        updateTeam: function(props) {
            var allTeams = this.getAllTeams(),
                team;
                
            for (var i = 0; i < allTeams.length; i++) {
                if(allTeams[i].name == this.getCurrentTeam().name) {
                    team = allTeams[i];
                    break;
                }
            }
            // Set the new properties
            team.name = props.name;
            team.clickCount = props.count;
            adminView.render();
            teamView.render();
        }
    };

    /* ======= View ========*/
    var teamView = {
        
        init: function() {
            // Store pointers to DOM elements for easy access later
            this.teamEl = document.getElementById('team');
            this.teamNameEl = document.getElementById('team-name');
            this.teamImageEl = document.getElementById('team-img');
            this.countEl = document.getElementById('team-count');

            // On click, increment the counters count
            this.teamEl.addEventListener('click', function(e) {
                octopus.incrementCounter();
            });

            // Render this view (update DOM elements with the right values)
            this.render();
        },

        render: function() {
            // Update the DOM elements with the values from the current team
            var currentTeam = octopus.getCurrentTeam();
            this.countEl.textContent = currentTeam.clickCount;
            this.teamNameEl.textContent = currentTeam.name;
            this.teamImageEl.src = currentTeam.imgSrc;
        }
    };

    var teamListView = {

        init: function() {
            // Store the DOM element for easy access later
            this.teamListElem = document.getElementById('team-list');

            // Render this view, update the DOM elements with the right values
            this.render();
        },

        render: function() {
            // Get all the teams that we will be rendering
            var teams = octopus.getAllTeams();

            // Empty the team list
            this.teamListElem.innerHTML = '';

            // Iterate over all the teams
            for (var i = 0; i < teams.length; i++) {
                // Current team
                var currentTeam = teams[i];

                // Make new team list item and set it's name
                var elem = document.createElement('li');
                elem.textContent = currentTeam.name;

                // On click, setCurrentTeam and render the teamView
                // (this uses our closure-in-a-loop trick to connect the 
                // view of the currentTeam variable  to click event function)
                elem.addEventListener('click', (function(currentTeamCopy) {
                    return function() {
                        octopus.setCurrentTeam(currentTeamCopy);
                        teamView.render();
                    }
                })(currentTeam));

                // Finally add the elem to the list
                this.teamListElem.appendChild(elem);
            } 
        }
    };

    var adminView = {

        init: function() {
            // Store DOM elements for easy access later
            var adminBtnEl = document.getElementById('admin-btn'),
                cancelBtnEl = document.getElementById('update-cancel-btn'),
                saveBtnEl = document.getElementById('update-save-btn');
            this.updateSectionEl = document.getElementById('update-section');
            var $this = this; // set the value of this so that it can be while adding event listener as context of this changes while attaching listener


            // Check if Admin, then show the Admin btn and add listeners
            if (octopus.isAdmin()) {
                adminBtnEl.style.display = 'block';

                // Add event listener to show update section
                adminBtnEl.addEventListener('click', function() {
                    // Show the update section
                    $this.updateSectionEl.style.display = 'block';
                    $this.render();
                });

                // Add event listener to save btn
                saveBtnEl.addEventListener('click', function() {
                    // Get the current form properties
                    var newTeamName = document.getElementById('update-name').value,
                        newClicksCount = document.getElementById('update-clicks').value;
                    
                    // Create an object with these properties
                    var teamProperties = {
                        name: newTeamName,
                        count: newClicksCount
                    }

                    // Call octopus to save the details
                    octopus.updateTeam(teamProperties);
                    // Hide the update section
                    $this.updateSectionEl.style.display = 'none';
                });

                // Add event listener to cancel btn
                cancelBtnEl.addEventListener('click', function() {
                    $this.updateSectionEl.style.display = 'none';
                });
            }
        },

        render: function() {

            // Get current team and set input values
            var currentTeam = octopus.getCurrentTeam(),
                teamName = document.getElementById('update-name'),
                clicksCount = document.getElementById('update-clicks');

            teamName.value = currentTeam.name;
            clicksCount.value = currentTeam.clickCount;
        }
    };
    octopus.init(); 
})();
