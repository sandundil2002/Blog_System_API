const axios = require('axios');
const { wrapper } = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');

const API_URL = 'http://localhost:3000';
const jar = new CookieJar();
const client = wrapper(axios.create({ jar }));

let createdPostId = '';

const testUser = {
    username: 'socketuser',
    email: 'socket@example.com',
    password: 'Socket@1234',
};

const log = (message) => console.log(`[${new Date().toLocaleTimeString()}] ${message}`);

async function registerUser() {
    try {
        log('Pending socket user registration...');
        await client.post(`${API_URL}/auth/register`, testUser);
        log('Socket user registered successfully');
    } catch (error) {
        log(`Socket user registration failed: ${error.response?.data?.message || error.message}`);
    }
}

async function login() {
    try {
        log('Pending socket user logging...');
        await client.post(`${API_URL}/auth/login`, {
            email: testUser.email,
            password: testUser.password,
        });
        log('Socket user login successful');
    } catch (error) {
        log(`Socket user login failed: ${error.response?.data?.message || error.message}`);
        throw error;
    }
}

async function createPost() {
    try {
        log('Pending create new post...');
        const response = await client.post(`${API_URL}/posts`, {
            title: 'Socket Test Post',
            content: 'This post is created to test WebSocket functionality',
        });
        createdPostId = response.data.id;
        log('Post created successful');
    } catch (error) {
        log(`Failed to create post: ${error.message}`);
    }
}

async function updatePost() {
    try {
        log('Pending update post...');
        await client.put(`${API_URL}/posts/${createdPostId}`, {
            title: 'Updated Socket Test Post',
            content: 'This post was updated to test WebSocket functionality',
        });
        log('Post updated successfully');
    } catch (error) {
        log(`Failed to update post: ${error.message}`);
    }
}

async function deletePost() {
    try {
        log('Pending Delete post...');
        await client.delete(`${API_URL}/posts/${createdPostId}`);
        log('Post deleted successfully');
    } catch (error) {
        log(`Failed to delete post: ${error.message}`);
    }
}

async function runTests() {
    try {
        await registerUser();
        await login();
        await createPost();
        log('Waiting 5 seconds to update...');
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await updatePost();
        log('Waiting 5 seconds to delete...');
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await deletePost();
        log('All test cases completed');
    } catch (error) {
        log(`Test cases failed: ${error.message}`);
    }
}

runTests();