<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses"  :class="itemClass" class="star-item" track-by="$index"></span>
	</div>
</template>

<script type="text/javascript">
	const LENGTH = 5;
	const CLS_ON = 'on';
	const CLS_HALF = 'half';
	const CLS_OFF = 'off';
	export default {
		props: {
			size:{
				type:Number
			},
			score:{
				type:Number
			}
		},
		computed:{
			starType() {
				return 'star-'+this.size;
			},
			itemClasses() {
				let result = [];
				let score = Math.floor(this.score*2)/2;
				let hasDecimal = score%1 !== 0;
				let integer =  Math.floor(score);
				for (var i = 0; i < integer; i++) {
					result.push(CLS_ON);
				}
				if(hasDecimal) {
					result.push(CLS_HALF);
				}
				while (result.length<LENGTH) {
					result.push(CLS_OFF);
				}
				return result;
			}

		}
	};
</script>
<style type="text/css">
	.star {
		font-size: 0;
	}
	/* .star-48 {
		width: 20px;
		height: 20px;
		margin-right: 22px;
		background-size: 20px 20px;
		
	} */
	.star-48 : last-chlid {
		margin-right: 0;
	}
	.on {
		background-image: url('star48_on@2x.png')
	}
	.star-48 .half {
		background-image: url('star48_half@2x.png')
	}
	.star-48 .off {
		background-image: url('star48_off@2x.png')
	}
	.star-36 {
		width: 15px;
		height: 15px;
		margin-right: 6px;
		background-size: 15px 15px;
	}
	.star-36 .no {
		background-image: url('star36_on@2x.png')
	}
	.star-36 .half {
		background-image: url('star36_half@2x.png')
	}
	.star-36 .off {
		background-image: url('star36_off@2x.png')
	}
	.star-24 {
		width: 10px;
		height: 10px;
		margin-right: 3px;
		background-size: 10px 10px;
	}
	.star-24 .no {
		background-image: url('star24_on@2x.png')
	}
	.star-24 .half {
		background-image: url('star24_half@2x.png')
    }
	.star-24 .off {
		background-image: url('star24_off@2x.png')
	}
	.star-item {
		display: inline-block;
		background-repeat: no-repeat;
		width: 20px;
		height: 20px;
		margin-right: 22px;
		background-size: 20px 20px;

	}
</style>