<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <iSelect />
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <HotCity />
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <Categroy />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from '@/components/changecity/iselect.vue'
import HotCity from '@/components/changecity/hotcity.vue'
import Categroy from '@/components/changecity/categroy.vue'

export default {
  components: {
    iSelect,
    HotCity,
    Categroy,
  },
}
</script>
