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
        type="button"
        class="btn btn-small"
        id="upload-button"
        @click="openFileSelector(name)"
        v-if="!value"
      >
        Upload résumé <span class="arrow">↑</span>
      </button>
      <span id="resume-filename" v-if="value">
        {{ value.name }}
      </span>
      <button
        type="button"
        class="remove-file"
        aria-label="Remove file"
        v-if="value"
        @click="removeFile(name)"
      >
        &times;
      </button>
    </span>
    <div class="input-error" v-if="error">
      <small>
        {{ error }}
      </small>
    </div>
  </div>
</template>

<style scoped>
#upload-button {
  margin-top: 8px;
}

.remove-file {
  margin-left: 12px;
  border: 0;
  background: none;
  color: var(--error);
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
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
