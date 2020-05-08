import wxCharts from '../../../utils/wxcharts-min.js';
var pieChart = null;
var lineChart = null;

Page({
    data: {
        pieData: [],
        lineData: [],
        isNoData: false
    },

    touchHandler: function (e) {
        console.log(lineChart.getCurrentDataIndex(e));
        lineChart.showToolTip(e, {
            // background: '#7cb5ec',
            format: function (item, category) {
                return category + ' ' + item.name + ':' + item.data 
            }
        });
    }, 

    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        let data = JSON.parse(options.data);
        console.log(data);
        let typeData = data[0];
        let dateList = data[1];
        let amountList = data[2];
        if (typeData.length == 0) {
            this.setData({
                isNoData: true
            })
            return;
        }
        console.log(typeData);
        console.log(dateList);
        console.log(amountList);
        this.setData({
            pieData: typeData
        })
        console.log(this.data.lineData);
        pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
            series: this.data.pieData,
            width: 300,
            height: 200,
        });
        lineChart = new wxCharts({
            canvasId: 'lineCanvas',
            type: 'line',
            categories: dateList,
            animation: true,
            series: [{
                name:"支出收入折线图",
                data:amountList,
                format: function (val) {
                    return val.toFixed(2);
                }
            }],
            xAxis: {
                disableGrid: true
            },
            yAxis: {
                title: '当日净收入',
                format: function (val) {
                    return val.toFixed(2);
                },
                min: 0
            },
            width: 300,
            height: 200,
            dataLabel: false,
            dataPointShape: true,
            extra: {
                lineStyle: 'curve'
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})