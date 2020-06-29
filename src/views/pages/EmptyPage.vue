<template>
    <div class="p-grid">
        <div class="p-col-12">
            <Breadcrumb class="breadcrumb" :home="breadIcon" :model="breadItems"/>
        </div>
        <div class="p-col-12">
            <div class="card">
                <h1>{{ title }}</h1>
                <p>Use this page to start from scratch and place your custom content.</p>
                <BlockUI :blocked="blockedPanel">
                    <Panel header="Godfather I" style="margin-top: 20px">
                        <p>The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding.
                            His beloved son Michael has just come home from the war, but does not intend to become part of his father's business.
                            Through Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family,
                            kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.</p>
                    </Panel>
                </BlockUI>
                <p>
                    <Button label="Primary" class="p-button-raised p-button-rounded" @click="showSuccess"/>
                </p>
                <p>
                    <Button label="Warning" class="p-button-warning" @click="showWarning"/>
                </p>
                <p>
                    <Button label="Danger" class="p-button-danger" @click="showDanger"/>
                </p>
                <Button type="button" label="Block" @click="blockPanel()"></Button>
                <Button type="button" label="Unblock" @click="unblockPanel()"></Button>

                <button class="p-link" id="teste" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu">
                    <span class="layout-topbar-icon pi pi-user"></span>
                </button>
                <Menu id="overlay_menu" ref="menu" :model="items" :popup="true"/>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: "Empty Page",
                breadIcon: {icon: 'pi pi-home', to: '/'},
                breadItems: [
                    {label: "Empty Page"},
                ],
                blockedPanel: false,
                blockedDocument: false,
                items: [
                    {
                        label: this.$t('configs.msg_account'),
                        icon: 'pi pi-user',
                        command: () => {
                            this.$toast.add({severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000});
                        }
                    },
                    {
                        label: this.$t('configs.msg_logout'),
                        icon: 'pi pi-power-off',
                        command: () => {
                            this.$toast.add({severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
                        }
                    }
                ]
            }
        },
        methods: {
            toggle(event) {
                this.$refs.menu.toggle(event);
            },
            showSuccess() {
                this.$toast.add({severity: 'success', summary: 'Mensagem Sucesso', detail: 'Botão Clicado', life: 2000});
            },
            showWarning() {
                this.$toast.add({severity: 'warn', summary: 'Mensagem warn', detail: 'Botão Clicado', life: 2000});
            },
            showDanger() {
                this.$toast.add({severity: 'error', summary: 'Mensagem error', detail: 'Botão Clicado', life: 2000});
            },
            blockDocument() {
                this.blockedDocument = true;

                setTimeout(() => {
                    this.blockedDocument = false;
                }, 3000);
            },
            blockPanel() {
                this.blockedPanel = true;
            },
            unblockPanel() {
                this.blockedPanel = false;
            }
        }
    }
</script>

<style scoped>

</style>