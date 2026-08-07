<template>
  <section class="comments-section">
    <h3 class="section-label">Comentarios</h3>
    <div class="comments-list" v-if="comments.length">
      <div v-for="(c, i) in comments" :key="i" class="comment-item">
        <p class="comment-text">{{ c }}</p>
      </div>
    </div>
    <div v-else class="no-comments">Aún no hay comentarios.</div>
    <textarea v-model="newComment" placeholder="Escribe tu comentario..." class="comment-input" rows="3"></textarea>
    <button @click="addComment" class="comment-submit">Enviar</button>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = defineProps<{ ramoId: number }>();

const storageKey = (id: number) => `ramo_comments_${id}`;

const comments = ref<string[]>([]);
const newComment = ref('');

function loadComments() {
  const stored = localStorage.getItem(storageKey(props.ramoId));
  comments.value = stored ? JSON.parse(stored) : [];
}

function saveComments() {
  localStorage.setItem(storageKey(props.ramoId), JSON.stringify(comments.value));
}

function addComment() {
  if (newComment.value.trim()) {
    comments.value.push(newComment.value.trim());
    newComment.value = '';
    saveComments();
  }
}

watch(() => props.ramoId, loadComments);

onMounted(loadComments);
</script>

<style scoped>
.comments-section {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #faf8f3;
  border-radius: 1rem;
  border: 1px solid #ffe8ee;
}
.section-label {
  font-family: var(--serif);
  font-size: 1.4rem;
  color: var(--dark);
  margin-bottom: 1rem;
}
.comments-list {
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 1rem;
}
.comment-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e7e5e4;
}
.comment-text {
  font-family: var(--sans);
  font-size: 0.85rem;
  color: #57534e;
}
.no-comments {
  font-family: var(--sans);
  font-size: 0.85rem;
  color: #a8a29e;
  margin-bottom: 1rem;
}
.comment-input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #e7e5e4;
  border-radius: 0.75rem;
  resize: vertical;
  font-family: var(--sans);
  font-size: 0.85rem;
}
.comment-submit {
  margin-top: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: var(--pink);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-family: var(--sans);
  cursor: pointer;
  transition: background 0.2s;
}
.comment-submit:hover {
  background: #d63d69;
}
</style>
