describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		const user = {
			name: 'Sona',
			username: 'sona',
			password:'sona'
		}
		cy.request('POST', 'http://localhost:3001/api/users', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function() {
		cy.contains('Log in to application')
		cy.get('#username')
		cy.get('#password')
		cy.contains('login')
	})

	describe('Login', function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username').type('sona')
			cy.get('#password').type('sona')
			cy.contains('login').click()

			cy.contains('Sona logged in.')
		})

		it('fails with wrong credentials', function() {
			cy.get('#username').type('sona')
			cy.get('#password').type('wrong password')
			cy.contains('login').click()

			cy.contains('Wrong credentials')
		})
	})

	describe('When logged in', function() {
		beforeEach(function() {
			cy.login({ username: 'sona', password: 'sona' })
		})

		it('a new blog can be created', function() {
			cy.contains('new blog').click()
			cy.get('#title').type('Test blog')
			cy.get('#author').type('Cypress')
			cy.get('#url').type('https://cypress.io')
			cy.get('#create-button').click()
			cy.contains('\'Test blog\' by Cypress added.')
		})

		describe('and several blogs exist', function() {
			beforeEach(function() {
				cy.createBlog({
					title: 'test blog 1',
					author: 'Cypress',
					url: 'https://cypress.io',
					likes: 3
				})

				cy.createBlog({
					title: 'test blog 2',
					author: 'Cypress',
					url: 'https://cypress.io',
					likes: 5
				})

				cy.createBlog({
					title: 'test blog 3',
					author: 'Cypress',
					url: 'https://cypress.io',
					likes: 4
				})
			})

			it('user can like a blog', function() {
				cy.contains('view').click()
				cy.get('#like-button').click()
				cy.contains('likes: 6')
			})

			it('user who added a blog can delete the blog', function() {
				cy.contains('view').click()
				cy.contains('delete').click()
				cy.get('html').should('not.contain', 'test blog 2')
			})

			it('blogs are sorted by number of likes', () => {
				cy.get('li').eq(0).should('contain', 'test blog 2')
				cy.get('li').eq(1).should('contain', 'test blog 3')
				cy.get('li').eq(2).should('contain', 'test blog 1')
			})
		})
	})
})