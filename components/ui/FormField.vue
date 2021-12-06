<template>
  <div class="field" :class="fieldClass">
    <input
      :type="inputType || 'text'"
      :name="name"
      :id="name"
      :class="inputClass || ''"
      @input="updateInputValue"
      v-if="inputType === 'checkbox'"
      :checked="value"
    />
    <label :for="name" :class="required && 'reqd'" v-if="label">
      {{ label }}
    </label>
    <input
      :type="inputType || 'text'"
      :name="name"
      :id="name"
      :class="inputClass || ''"
      :value="value"
      @input="updateInputValue"
      :placeholder="placeholder"
      :required="required"
      v-if="['text', 'email'].includes(inputType)"
      class="input-text"
    />
    <span v-if="inputType === 'select'">
      <select
        :name="name"
        :id="name"
        :class="inputClass || ''"
        :value="value"
        @input="updateInputValue"
        :required="required"
      >
        <option :value="option" v-for="option in options" :key="option">
          {{ option }}
        </option>
      </select>
    </span>
    <textarea
      :name="name"
      :id="name"
      :class="inputClass || ''"
      :value="value"
      @input="updateInputValue"
      :placeholder="placeholder"
      :required="required"
      :rows="rows || 5"
      v-if="inputType === 'textarea'"
    >
    </textarea>
    <span v-if="inputType === 'file'">
      <input
        :type="inputType || 'text'"
        :name="name"
        :id="name"
        :class="inputClass || ''"
        @change="onFileChange"
        :accept="accept"
        :ref="name"
        hidden
      />
      <button
        class="button icon solid fa-upload"
        id="upload-button"
        @click.prevent="openFileSelector(name)"
        v-if="!value"
      >
        Upload Resume
      </button>
      <span id="resume-filename" v-if="value">
        {{ value.name }}
      </span>
      <i
        class="remove-file fa fa-close"
        v-if="value"
        @click="removeFile(name)"
      ></i>
    </span>
    <div class="input-error" v-if="error">
      <small>
        {{ error }}
      </small>
    </div>
  </div>
</template>

<style scoped>
label {
  font-size: 1rem;
}

.input-error {
  margin-top: 0.2rem;
  font-size: 0.75rem;
  color: #ff3333;
}

.remove-file {
  color: red;
  cursor: pointer;
  margin-left: 1rem;
}
</style>

<script>
export default {
  props: {
    value: null,
    inputType: {
      type: String,
      validator(value) {
        return [
          'text',
          'email',
          'select',
          'textarea',
          'file',
          'checkbox',
        ].includes(value)
      },
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: () => false,
    },
    label: String,
    placeholder: String,
    inputClass: String,
    fieldClass: String,
    error: String,
    rows: Number,
    accept: String,
    options: [Object, Array],
    validator: Function,
  },

  methods: {
    updateInputValue(e, value) {
      this.$emit('input', value || e.target.value)
    },
    openFileSelector(name) {
      this.removeFile(name)
      this.$refs[name].click()
    },
    onFileChange(e) {
      const files = e.target.files || (e.dataTransfer && e.dataTransfer.files)
      this.$emit('validate', this.name, files[0])
      this.updateInputValue(e, files[0])
    },

    removeFile(name) {
      this.$refs[name].value = ''
      this.$emit('input', null)
    },
  },
}
</script>
