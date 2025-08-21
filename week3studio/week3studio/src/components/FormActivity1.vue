<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center">User Information Form</h1>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" 
                            class="form-control" id="username" v-model="formData.username">
                        </div>
                        <div class="col-md-6">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" 
                            class="form-control" 
                            id="password" 
                            v-model="formData.password">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="isAustralian" 
                                v-model="formData.isAustralian">
                                <label class="form-check-label" for="isAustralian">
                                    Australian Resident?
                                </label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="gender" class="form-label">Gender</label>
                            <select class="form-select" id="gender" 
                            v-model="formData.gender">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="reason" class="form-label">Reason for joining</label>
                        <textarea class="form-control" id="reason" rows="3" 
                        v-model="formData.reason"></textarea>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="row mt-5" v-if="submittedCards.length">
            <div class="d-flex flex-wrap justify-content-start">
                <div v-for="(card, index) in submittedCards" :key="index" class="card m-2" style="width: 18rem;">
                    <div class="card-header">
                        User Information
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Username: {{ card.username }}</li>
                        <li class="list-group-item">Password: {{ card.password }}</li>
                        <li class="list-group-item">Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}</li>
                        <li class="list-group-item">Gender: {{ card.gender }}</li>
                        <li class="list-group-item">Reason: {{ card.reason }}</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- <div class="row mt-5" v-if="submittedCards.length">
            <DataTable :value="submittedCards" tableStyle="min-width: 50rem">
                <Column field="username" header="Username" />
                <Column field="password" header="Password" />
                <Column header="Australian Resident">
                    <template #body="{ data }">
                        {{ data.isAustralian ? 'Yes' : 'No' }}
                    </template>
                </Column>
                <Column field="gender" header="Gender" />
                <Column field="reason" header="Reason" />
            </DataTable>
        </div> -->
    </div>

    <!-- <div class="form">
    <h1>User Information Form / Credentials</h1>
        <form>
            <label for="username">Username:</label><br>
            <input type="text" id="username" name="username"><br>
            
            <label for="password">Password:</label><br>
            <input type="password" id="password" name="password"><br>
            
            <label for="isAustralian">Australian Resident?</label><br>
            <input type="checkbox" id="isAustralian" name="isAustralian"><br>
            
            <label for="reason">Reason For Joining:</label><br>
            <textarea id="reason" name="reason" rows="3"></textarea><br>
            
            <label for="gender">Gender</label><br>
            <select id="gender">
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
            </select>
        </form>
    </div> -->
</template>

<script setup>


import { ref } from 'vue';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

// Our logic will go here
const formData = ref({
    username: "",
    password: "",
    isAustralian: false,
    reason: "",
    gender: ""
})

const submittedCards = ref([]);

const submitForm = () => {
    submittedCards.value.push({ ...formData.value });
    clearForm();
};

const clearForm = () => {
    formData. value = {
        username: "",
        password: "", 
        isAustralian: false, 
        reason: "",
        gender: ""
    }
};

const errors = ref({
    username: null,
    password: null,
    resident: null,
    gender: null,
    reason: null
});

const validateName = (blur) => {
    if (formData.value.username.length < 3) {
        if (blur) errors.value.username = "Name must be at least 3 characters"
    } else {
        errors.value.username = null;
    }
}

const validatePassowrd = (blur) => {
    const password = formData.value.password;
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
    } else if (!hasUppercase){
        if (blur) errors.value.password = "Password must contain at least one uppercase letter.";
    } else if (!hasLowercase) {
        if (blur) errors.value.password = "Password must contain at least one lowercase letter.";
    } else if (!hasNumber) {
        if (blur) errors.value.password = "Password must contain at least one number.";
    } else if (!hasSpecialChar) {
        if (blur) errors.value.password = "Password must contain at least one special character.";
    } else {
        errors.value.password = null;
    }
}

const validateGender = (blur) => {
    if (!formData.value.gender) {
        if (blur) errors.value.gender = "Please select a gender.";
    } else {
        errors.value.gender = null;
    }
}

const validateReason = (blur) => {
    if (formData.value.reason.length < 10) {
        if (blur) errors.value.reason = "Reason must be at least 10 characters long.";
    } else {
        errors.value.reason = null;
    }
}

</script>

<style scoped>
   .card {
   border: 1px solid #ccc;
   border-radius: 10px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   }
   .card-header {
   background-color: #275FDA;
   color: white;
   padding: 10px;
   border-radius: 10px 10px 0 0;
   }
   .list-group-item {
   padding: 10px;
   }
</style>