<template>
  <div class="pt-10 px-5">
    <div class="container mx-auto">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-4xl font-bold">Products</h1>
          <p class="text-gray-400">List of products</p>
        </div>

        <div>
          <UButton icon="i-heroicons-pencil-square" color="primary" variant="solid" label="Create new product"
            @click="isModalCreateOpen = true" />

          <UModal v-model="isModalCreateOpen" prevent-close>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
              <template #header>
                <div class="flex items-center justify-between">
                  <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                    New Product
                  </h3>
                  <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                    @click="isModalCreateOpen = false" />
                </div>
              </template>

              <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Product name" name="name">
                  <UInput v-model="state.name" />
                </UFormGroup>

                <UFormGroup label="Product description" name="description">
                  <UInput v-model="state.description" />
                </UFormGroup>

                <UFormGroup label="Product price" name="price">
                  <UInput v-model="state.price" modelValue="number">
                    <template #trailing>
                      <span class="text-gray-500 dark:text-gray-400 text-xs">IDR</span>
                    </template>
                  </UInput>
                </UFormGroup>

                <UFormGroup label="Product category" name="category">
                  <USelect v-model="state.category" :options="categories" option-attribute="name">
                  </USelect>
                </UFormGroup>

                <UFormGroup label="Product occasion" name="occasion">
                  <div class="grid grid-cols-3 gap-2">
                    <UCheckbox v-model="state.occasion" v-for="occasion in occasions" :label="occasion.name" />
                  </div>
                </UFormGroup>

                <UFormGroup label="Product image" name="image">
                  <!-- <UInput type="file" v-model="state.image" /> -->
                  <input type="file" @change="uploadFile" />
                </UFormGroup>


                <UButton type="submit">
                  Submit
                </UButton>
              </UForm>
            </UCard>
          </UModal>
        </div>
      </div>


      <div class="mt-4">
        <UTable :rows="products" :columns="columns">
          <template #actions-data="{ row }">
            <div class="flex space-x-4">
              <UButton color="red" variant="ghost" icon="i-heroicons-trash" label="Delete" />
              <UButton color="sky" variant="ghost" icon="i-heroicons-adjustments-vertical" label="Update" />
            </div>
          </template>
        </UTable>
      </div>
    </div>
  </div>
</template>

<script setup>
const products = ref([])
const categories = ref([])
const occasions = ref([])
const state = reactive({
  name: undefined,
  price: undefined,
  description: undefined,
  category: undefined,
  occasion: undefined,
  image: undefined
})

const file = ref(null);

const fileName = computed(() => file.value?.name);
const fileExtension = computed(() => fileName.value?.substr(fileName.value?.lastIndexOf(".") + 1));
const fileMimeType = computed(() => file.value?.type);


const isModalCreateOpen = ref(false)

const columns = [
  {
    key: 'name',
    label: 'Product Name'
  },
  {
    key: 'price',
    label: 'Price'
  },
  {
    key: 'stock',
    label: 'Stock'
  },
  {
    key: 'category',
    label: 'Category'
  },
  {
    key: 'occasion',
    label: 'Occasion'
  },
  {
    key: 'actions',
    label: 'Action'
  }
]

const { data: dataProduct, pending, error, refresh } = await useGetFetch('product', {
  onResponse({ request, response, options }) {
    products.value = response._data.productData
  }
})

const { data: dataCategory } = await useGetFetch('category', {
  onResponse({ response }) {
    categories.value = response._data.categoryData
  }
})

const { data: dataOccasion } = await useGetFetch('occasion', {
  onResponse({ response }) {
    // console.log(response._data);
    occasions.value = response._data.occasionData
  }
})


const uploadFile = (event) => {
  file.value = event.target.files[0];

  submitFile();
};

const submitFile = async () => {
  // const reader = new FileReader();
  // reader.readAsDataURL(file.value);
  // reader.onload = async () => {
  //   const encodedFile = reader.result.split(",")[1];
  //   const data = {
  //     file: encodedFile,
  //     fileName: fileName.value,
  //     fileExtension: fileExtension.value,
  //     fileMimeType: fileMimeType.value,
  //   };

    const formData = new FormData()
    formData.append("file", file.value)

    // console.log(formData.get(file));
    try {
      const endpoint = "http://localhost:3030/upload/one";
      // const response = await axios.post(endpoint, data);

      const {data: dataImage} = await useFetch(endpoint, {
        method: 'POST',
        body: formData
      })

      console.log(dataImage.value);
    } catch (error) {
      console.error(error);
    }
  // };
};


const validate = (state) => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Required' })
  if (!state.price) errors.push({ path: 'price', message: 'Required' })
  if (!state.description) errors.push({ path: 'description', message: 'Required' })
  if (!state.category) errors.push({ path: 'category', message: 'Required' })
  if (!state.occasion) errors.push({ path: 'occasion', message: 'Required' })
  if (!state.image) errors.push({ path: 'image', message: 'Required' })
  return errors
}

async function onSubmit(event) {
  // Do something with data
  console.log(event.data)
}



</script>

<style></style>