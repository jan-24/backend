<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="box-card">
        <div class="box">
          <img
            class="mings"
            src="@/assets/3da892c5e4a63f35ea9f12c162c8acb.jpg"
            alt=""
          />
          <div class="text">
            <p>Admin</p>
            <p>超级管理员</p>
          </div>
        </div>
        <div class="box-text">
          <p>上次登录时间：<span>2022-01-05</span></p>
          <p>上次登录地点：<span>深圳</span></p>
        </div>
      </el-card>
      <el-card class="box-tad">
        <el-table :data="tableData" style="width: auto">
          <el-table-column
            v-for="(val, key) in codData"
            :key="val"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-right: 10px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex' }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ backgroundColor: item.color }"
          ></i>
          <div class="text">
            <p>￥ {{ item.value }}</p>
            <p>{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <!-- 折线图 -->
        <div ref="echarts1" style="height: 280px"></div>
      </el-card>

      <div class="chets">
        <el-card style="height: 260px">
          <!-- 柱图 -->
          <div ref="echarts2" style="height: 260px"></div>
        </el-card>
        <el-card style="height: 260px">
          <!-- 饼图 -->
          <div ref="echarts3" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "@/api";
import * as echarts from 'echarts';
export default {
  data () {
    return {
      tableData: [],
      codData: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买',
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const res = await getData()
      this.tableData = res.data.data.tableData

      // 基于准备好的dom，初始化echarts实例
      var echarts1 = echarts.init(this.$refs.echarts1);
      // 绘制折线图表
      var option = {}
      //处理x轴
      const { orderData, userData, videoData } = res.data.data
      const xechats = Object.keys(orderData.data[0])
      const xAxisData = {
        data: xechats
      }
      option.xAxis = xAxisData
      option.yAxis = {}
      option.tooltip = {}
      option.legend = xAxisData
      option.series = []
      xechats.forEach(key => {
        var datats = []
        orderData.data.forEach(item => {
          datats.push(item[key])
        })
        option.series.push({
          name: key,
          // data: orderData.data.map(item => item[key]),
          data: datats,
          type: 'line'
        })
      })
      // 使用刚指定的配置项和数据显示图表
      echarts1.setOption(option);

      // 基于准备好的dom，初始化echarts实例
      var echarts2 = echarts.init(this.$refs.echarts2);
      // 绘制柱状图表
      var option2 = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          // userData.forEach(item => {
          //     add.push(item.date)
          // })
          data: userData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
        series: [
          {
            name: '新增用户',
            data: userData.map(item => item.new),
            type: 'bar'
          },
          {
            name: '活跃用户',
            data: userData.map(item => item.active),
            type: 'bar'
          }
        ],
      }
      // 使用刚指定的配置项和数据显示图表
      echarts2.setOption(option2)

      // 基于准备好的dom，初始化echarts实例
      var echarts3 = echarts.init(this.$refs.echarts3);

      // 绘制柱状图表饼
      var option3 = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            data: videoData,
            type: 'pie'
          }
        ],
      }
      // 使用刚指定的配置项和数据显示图表
      echarts3.setOption(option3)
    }
  },
  mounted () {

  }
}
</script>
<style lang="less" scoped>
.box {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #aca6a6;

  .mings {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }

  .text {
    margin-left: 50px;

    p:nth-child(1) {
      font-size: 40px;
      margin-bottom: 10px;
    }

    p:nth-child(2) {
      font-size: 26px;
      color: orange;
    }
  }
}

.box-text {
  padding-top: 10px;

  p {
    span {
      padding-left: 20px;
      color: orange;
    }
  }

  p:nth-child(1) {
    font-size: 16px;
    margin-bottom: 10px;
  }

  p:nth-child(2) {
    font-size: 16px;
  }
}

.box-tad {
  margin-top: 30px;
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }

  .icon {
    width: 80px;
    height: 80px;
    line-height: 80px;
    font-size: 30px;
    color: #fff;
    text-align: center;
  }

  .text {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    justify-content: center;

    p:nth-child(1) {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }

    p:nth-child(2) {
      font-size: 14px;
      color: orange;
      text-align: center;
    }
  }
}

.chets {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .el-card {
    width: 48%;
  }
}
</style>
