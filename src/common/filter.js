import Vue from 'vue'

Vue.filter('filterNumber',function(number){
    if(number<10000){
        return number
    }else{
        return (number/10000).toFixed(2)+'w'
    }
})