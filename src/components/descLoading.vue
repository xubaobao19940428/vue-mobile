<template>
	<div class="cloading" :style="{height:clientHeight + 'px'}" @touchmove.prevent @mousewheel.prevent v-if="dscLoading">
		<div class="cloading-mask"></div>
		<slot name="text">
			<div class="cloading-main">
				<img src="../assets/img/loading.gif" />
			</div>
		</slot>
	</div>
</template>

<script>
import {
    Loading
} from 'vant'

export default{
    name:'descLoading',
	props:['dscLoading'],
	data(){
		return{
			clientHeight:''
		}
	},
	components:{
		[Loading.name]:Loading
	},
	created(){},
	mounted(){
		this.clientHeight = document.documentElement.clientHeight;
	},
	methods:{

	}
}
</script>

<style scoped>
.cloading{ position: fixed; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%; z-index: 99999; overflow-y:hidden;}
.cloading-mask{ position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%; z-index: 99999; background:#ffffff;}
.cloading-main{ position: absolute; z-index: 100000; top: 50%; left: 50%; margin-top: -40px; margin-left: -40px; }
.text{ position: absolute; z-index: 100000; top: 50%; text-align: center; font-size: 1.5rem; width: 20rem; left: 50%; margin-top: -2rem; margin-left: -10rem;}
</style>