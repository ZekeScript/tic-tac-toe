// @ts-check
import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173/'

test('Render app component', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const header = await page.textContent('header h1')
  expect(header).toBe('Tic Tac Toe')
})
