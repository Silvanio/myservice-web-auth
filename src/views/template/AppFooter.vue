<template>


    <div class="footer-abs layout-footer">
			<span class="footer-text-left">
				<img alt="Logo" src="@/assets/images/mylogo.png"/>
			</span>
		<span class="footer-text-right footer-text-title">
			<button class="p-link footer-text-right-new">Administração de acessos</button>
		</span>
		<span class="footer-text-right footer-text-btn">
			<button class="p-link"><i class="fa fa-instagram"></i></button>
			<button class="p-link"><i class="fa fa-facebook"></i></button>
			<button class="p-link"><i class="fa fa-twitter"></i></button>
		</span>
    </div>




</template>

<script>
    export default {
        name: "AppFooter"
    }
</script>

<style scoped>
    .footer-abs {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 39px;
    }

    .layout-wrapper .layout-footer {
        padding: 8px 20px !important;
    }

    layout-wrapper .layout-footer .footer-text-left img {
        height: 20px !important;
    }

	@media (min-width: 1025px){
		.layout-wrapper .layout-footer .footer-text-right button {
			font-size: 15px;
		}
		.footer-text-title{
			position: fixed;
			margin-top: 3px;
		}
		.footer-text-btn{
			margin-right: 130px;
			margin-top: 3px;
		}
		.footer-text-right-new{
			float: right;
		}
	}

	@media (max-width: 1024px){
		.layout-wrapper .layout-footer .footer-text-right button {
			font-size: 11px;
		}
		.footer-text-title{
			margin-right: 25px;
			margin-top: 3px;
		}
		.footer-text-btn{
			margin-right: 25px;
			margin-top: 3px;
		}
		.layout-wrapper .layout-footer .footer-text-left img {
			height: 18px;
		}
	}


</style>