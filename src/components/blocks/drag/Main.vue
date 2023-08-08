<template>
    <div class="upload">
       <DropZone class="drop-area" @files-dropped="addFiles" #default="{ dropZoneActive }">
          <label for="file-input">
             <span v-if="dropZoneActive">
                <span>Drop Them Here</span>
                <span class="smaller">to add them</span>
             </span>
             <span v-else>
                <span>Притяните сюда файл (макс 16 мб)</span>
                <br>
                <span class="smaller">
                   или 
                   <br>
                   Выберите файл
                </span>
             </span>
 
             <input type="file" id="file-input" multiple @change="onInputChange" />
          </label>
          <ul class="image-list" v-show="files.length">
             <FilePreview v-for="file of files" :key="file.id" :file="file" tag="li" @remove="removeFile" />
          </ul>
       </DropZone>
       <button @click.prevent="uploadFiles(files)" class="upload-button">Upload</button>
    </div>
 </template>
 
 <script>
 import DropZone from '@/components/blocks/drag/DropZone.vue'
 import FilePreview from '@/components/blocks/drag/FilePreview.vue'
 import createUploader from '@/components/blocks/drag/file-uploader'
 import useFileList from '@/components/blocks/drag/file-list'
 
 const { files, addFiles, removeFile } = useFileList()
 
 function onInputChange(e) {
    addFiles(e.target.files)
    e.target.value = null
 }
 
 const { uploadFiles } = createUploader('YOUR URL HERE')
 
 export default {
    name:'DragDrop',
    components: {
       DropZone,
       FilePreview
    },
    data() {
       return {
          files: files
       }
    },
    methods: {
       removeFile,
       onInputChange
    },
    mounted() {
       uploadFiles(this.files)
    }
 }
 
 </script>
 
 <style scoped lang="scss">
</style>
 <!-- <template>
    <div class="content">
       <h1>Календарь</h1>
    </div>
 </template>
 <script>
 export default {
    name: 'CalendarIndex',
 }
 </script>
 
 <style scoped lang="scss"></style> -->
 