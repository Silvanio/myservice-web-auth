export default {
    data() {
        return {
            companyPage: {
                content: [],
                totalElements: 0
            },
            pageable :{
                pageSize: 10,
                pageNumber: 0,
                offset: 0,
                entity:{}
            }
        }
    },
    mounted() {
        this.getService().findAll(this.pageable).then((response) => {
            this.companyPage = response;
        });
    },
    methods: {
        onPage(event) {
            if(event){
                this.pageable.pageSize = event.rows;
                this.pageable.pageNumber =event.first == 0 ? 0 : event.first / event.rows;
                this.pageable.offset = event.first;
                if(event.sortField) {
                    this.pageable.orderDTO = [{
                        field: event.sortField,
                        direction: event.sortOrder == 1 ? "ASC" : "DESC"
                    }];
                }
            }
            // caso tiver filtros
            //modelo de filter a colocar na classe principal
            //filters:[
            //    {
            //        field: "fiscalNumber",
            //        type: "LIKE"
            //    },
            //    {
            //        field: "name",
            //        type: "LIKE"
            //    }
           // ]
            this.pageable.filterDTO = this.filters;
            this.getService().findAll(this.pageable).then((response) => {
                this.companyPage = response;
            });
        },
    }
};