var score;
var currentAnswer;
var scoreList = {
    table: []
};

function display_question(num1, num2, opr, answer) {
    currentAnswer = answer;
    $("#question_1301160425").text(num1 + " " + opr + " " + num2 + " =");
    $("#answer_1301160425").text("0");
}

function question_addition() {
    var num1 = Math.floor(Math.random() * 50) + 1;
    var num2 = Math.floor(Math.random() * 50) + 1;
    var answer = num1 + num2;
    display_question(num1, num2, "+", answer);
}

function question_substraction() {
    var num1 = Math.floor(Math.random() * 100) + 1;
    var num2 = Math.floor(Math.random() * num1) + 1;
    var answer = num1 - num2;
    display_question(num1, num2, "-", answer);
}

function question_multiplication() {
    var num1 = Math.floor(Math.random() * 50) + 1;
    var num2 = Math.floor(Math.random() * 10) + 1;
    var answer = num1 * num2;
    display_question(num1, num2, "x", answer);
}

function question_division() {
    var num2 = Math.floor(Math.random() * 20) + 1;
    var answer = Math.floor(Math.random() * 20) + 1;
    var num1 = answer * num2;
    display_question(num1, num2, "/", answer);
}

function move_clock() {
    $("#clock_1301160425").stop();
    $("#clock_1301160425").css("margin-left", "0px");
    $("#clock_1301160425").animate({"margin-left": "+=860px"}, 10000, "linear", game_over);
}

function generate_question() {
    var type = Math.floor(Math.random() * 16);
    if (type < 6) {
        question_addition();
    }
    else if (type < 12) {
        question_substraction();
    }
    else if (type < 14) {
        question_multiplication();
    }
    else {
        question_division();
    }
    move_clock();
}

function new_game() {
    $("#scoreCount_1301160425").text("0");
    $("#submitScore_1301160425").hide();
    $("#scoreList_1301160425").hide();
    $("#game_1301160425").show();
    score = 0;
    generate_question();
}

function game_over() {
    $("#game_1301160425").hide();
    $("#nameInput").val("");
    $("#nimInput").val("");
    $("#submitScore_1301160425").show();
    $("#finalScore_1301160425").text("SCORE: " + score);
}

function check_answer(subAnswer) {
    if (subAnswer == currentAnswer) {
        alert("Jawaban Benar!");
        score += 100;
        $("#scoreCount_1301160425").text(score);
        generate_question();
    }
    else {
        alert("Jawaban Salah!\nGame Over...");
        game_over();
    }
}

function submit_score() {
    var s_name = $("#nameInput").val();
    var s_nim = $("#nimInput").val();
    var s_score = score;
    var newScore = {
        name: s_name,
        nim: s_nim,
        score: s_score
    };
    scoreList.table.push(newScore);
    scoreList.table.sort(function(a, b) {
        if(a.score < b.score) {
            return 1;
        }
        else if(a.score > b.score) {
            return -1;
        }
        return 0;
    });
    var scoreListJSON = JSON.stringify(scoreList);
    localStorage.setItem("score_list", scoreListJSON);
    show_score_list();
}

function show_score_list() {
    var html = "<tr><th>Rank</th><th>Name</th><th>NIM</th><th>Score</th></tr>";
    for (i = 0; i < scoreList.table.length; i++) {
        var s = scoreList.table[i];
        html += "<tr><td>" + (i+1) + "</td><td>" + s.name + "</td><td>" + s.nim + "</td><td>" + s.score + "</td></tr>";
    }
    $("#scoreList_1301160425 > table").html(html);
    $("#submitScore_1301160425").hide();
    $("#scoreList_1301160425").show();
}

$(document).ready(function () {
    $(".numBtn_1301160425").on("click", function () {
        var num = $(this).text();
        var text = $("#answer_1301160425").text();
        if (text == "0") {
            if (num == "0") {
                num = "";
            }
            else {
                text = "";
            }
        }
        text += num;
        $("#answer_1301160425").text(text);
    });
    $("#clearBtn_1301160425").on("click", function () {
        var text = $("#answer_1301160425").text();
        if (text.length > 0) {
            text = text.slice(0, text.length - 1);
        }
        if (text.length == 0) {
            $("#answer_1301160425").text("0");
        }
        else {
            $("#answer_1301160425").text(text);
        }
    });
    $("#submitBtn_1301160425").on("click", function () {
        var subAnswer = $("#answer_1301160425").text();
        check_answer(subAnswer);
    });
    $("#submitScoreBtn_1301160425").on("click", submit_score);
    var scoreListJSON = localStorage.getItem("score_list");
    if (scoreListJSON !== null) {
        var scoresObj = JSON.parse(scoreListJSON);
        scoreList.table = scoresObj.table;
    }
    $("#newGameBtn_1301160425").on("click", new_game);
    new_game();
});