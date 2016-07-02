var initialTeams = [
    {
        clickCount: 0,
        name: 'Arsenal',
        imgSrc: 'images/img1.jpeg',
        nicknames: ["The Gooners", "The invincibles", "London is red", "Gunners"]
    },
    {
        clickCount: 0,
        name: 'Machester City',
        imgSrc: 'images/img2.jpg',
        nicknames: ["The blues"]
    },
    {
        clickCount: 0,
        name: 'Real Madrid',
        imgSrc: 'images/img3.jpg',
        nicknames: ["Los Blancos"]
    },
    {
        clickCount: 0,
        name: 'Germany National Team',
        imgSrc: 'images/img4.png',
        nicknames: ["Deustch Land"]
    },
    {
        clickCount: 0,
        name: 'Portugal National Team',
        imgSrc: 'images/img5.png',
        nicknames: ["CR7 team"]
    },
    
];

var Team = function(data) {
    this.clickCount = ko.observable(data.clickCount); // clicks count of the image
    this.teamName = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);

    this.nicknames = ko.observableArray(data.nicknames);

    // Compute level after each click, and update it
    this.level = ko.computed(function() {
        var level;
        if (this.clickCount() > 5 && this.clickCount() <= 15) {
            level = "Greater than 5";
        } else if (this.clickCount() > 15) {
            level = "Greater than 15";
        } else {
            level = "Calculating";
        }
        return level;
    }, this);

}
var ViewModel = function() {
    var self = this;
    this.teamList = ko.observableArray([]);
    
    initialTeams.forEach(function(teamItem) {
        // Passing each team details one at a time
        // Similar to self.teamList.push( new Team({name: "Arsenal", .......}) );
        self.teamList.push( new Team(teamItem) );
    });
    this.currentTeam = ko.observable( this.teamList()[0] );

    // As using with in views, while calling this in views we are in the binding 
    // context of currentTeam so we need not say this.currentTeam().clickCount(...)
    // so here this will be the currentTeam object.
    // Alternative approach, define global var self = this, and inside incrementCounter
    //  use self.currentTeam().clickCount(self.currentTeam().clickCount() + 1); as here self refers to the ViewModel
    //  Neither of the 2 approaches is right or wrong, solves same problem.
    this.incrementCounter = function() {
        this.clickCount(this.clickCount() + 1);
    }

    // The object gets passed in on which we clicked
    this.setTeam = function(clickedTeam) {
        self.currentTeam(clickedTeam);
    }
}

ko.applyBindings(new ViewModel());
