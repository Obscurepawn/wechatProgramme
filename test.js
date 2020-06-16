// var myDate = new Date();
// month = myDate.getFullYear();
// function test(month){
//     return month+1;
// }
// console.log(month)
// console.log(typeof(month))
// console.log(test(month))

groups = [
    {
        date: "2020-4-8",
        income: 0,
        expenditrue: -22,
        detail: [{
            usefulness: "car",
            amount: -15,
            comments: "回学校",
            payer: "Jankos"
        },
        {
            usefulness: "food",
            amount: -7,
            comments: "吃早餐",
            payer: "Me"
        },
        {
            usefulness: "play",
            amount: -300,
            comments: "买最新款的游戏",
            payer: "Me",
        },
        ]
    },
    {
        date: "2020-4-7",
        income: 13000,
        expenditrue: -7050,
        detail: [
            {
                usefulness: "house",
                amount: -7000,
                comments: "付房租",
                payer: "Me",
            },
            {
                usefulness: "financial",
                amount: 13000,
                comments: "发工资",
                payer: "Boss",
            },
            {
                usefulness: "book",
                amount: -50,
                comments: "买《白夜行》",
                payer: "Me",
            },
        ]
    }
]

function getSum(val) {
    console.log(val)
    var Expenditrue = 0;
    var Income = 0;
    val.forEach(element => {
        element.detail.forEach(bill => {
            console.log(bill)
            if (bill.amount < 0) {
                Expenditrue += bill.amount;
            } else if (bill.amount > 0) {
                Income += bill.amount;
            }
        });
    }
    )
    console.log(Expenditrue, Income);
}

function newIndexOf(list, data) {
    for (value of list) {
        if (value == data) {
            return true;
        }
    }
    return false;
}



function makeList(val) {
    let list = val.split(" ");
    let count = 0;
    let temp = [];
    for (element of groups) {
        count = 0;
        if (element.date.search(val) != -1 || newIndexOf(list, element.date)) {
            count += 1;
        }
        if (element.income == val || newIndexOf(list, element.income)) {
            count += 1;
        }
        if (element.expenditrue == val || newIndexOf(list, element.expenditrue)) {
            count += 1;
        }
        for (bill of element.detail) {
            for (data in bill) {
                if (newIndexOf(list, bill[data])) {
                    count += 1
                }
                else if (typeof bill[data] == "string") {
                    if (bill[data].search(val) != -1) {
                        count += 1
                    }
                } else if (typeof bill[data] == "number") {
                    if (bill[data] == val) {
                        count += 1;
                    }
                }
            }
        }
        if (count != 0) {
            temp.push(element);
            temp[temp.length - 1].count = count;
        }
    }
    return temp.sort(function (a, b) { return b.count - a.count });
}

function makeText(list) {
    let ret = [];
    let temp;
    for (element of list) {
        temp = ""
        temp += element.date + ";";
        for (detail of element.detail) {
            temp += detail.comments + ";";
        }
        ret.push(temp);
    }
    return ret;
}

// getSum(groups);

function testSearch() {
    str = "123456"
    console.log(str.search(888))
}

function testLet() {
    let temp = 0;
    if (true) {
        let kk = new Object();
        kk.oop = 1;
        kk.oob = 2;
        temp = kk;
    }
    // console.log(kk);
    console.log(temp);
}

// testSearch()

// console.log(makeList("回学校 13000 -7050"));
// console.log(makeText(makeList("回学校 13000 -7050")));

// console.log(parseInt("100000"));
// console.log(parseInt("12a000"));
// console.log(Number("aaabbc"))

// list = ["123","456"]
// console.log(list.indexOf(456))

//testLet()
for (let index = 0; index < 10; ++index) {
    console.log(index);
}

console.log(Number(""))




