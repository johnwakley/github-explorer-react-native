import os
import unittest
from time import sleep
from appium import webdriver

# Returns abs path relative to this file and not cwd
PATH = lambda p: os.path.abspath(
    os.path.join(os.path.dirname(__file__), p)
)

class AndroidTests(unittest.TestCase):
    def setUp(self):
        desired_caps = {}
        desired_caps['platformName'] = 'Android'
        desired_caps['platformVersion'] = '6'
        desired_caps['deviceName'] = 'Android Emulator'
        desired_caps['app'] = PATH(
            './artifacts/app-release.apk'
        )

        self.driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)

    def tearDown(self):
        # end the session
        self.driver.quit()

    def test_trending_screen(self):
        el = self.driver.find_element_by_accessibility_id('menu')
        el.click()

        el = self.driver.find_element_by_accessibility_id('Trending')
        el.click()        

        # tabling loading...
        sleep(2)

        table = self.driver.find_element_by_accessibility_id("repoList")
        self.assertIsNotNone(table)

        # tap on first cell
        cell = table.find_element_by_accessibility_id("repoCell")        
        self.assertIsNotNone(cell)
        cell.click()
        
        # check that repo detail renders
        hero = self.driver.find_element_by_accessibility_id("scrollview")   
        self.assertIsNotNone(hero)

    def test_most_starred_screen(self):
        el = self.driver.find_element_by_accessibility_id('menu')
        el.click()

        el = self.driver.find_element_by_accessibility_id('Most Starred')
        el.click()        

        # tabling loading...
        sleep(2)

        table = self.driver.find_element_by_accessibility_id("repoList")
        self.assertIsNotNone(table)

        # tap on first cell
        cell = table.find_element_by_accessibility_id("repoCell")        
        self.assertIsNotNone(cell)
        cell.click()
        
        # check that repo detail renders
        hero = self.driver.find_element_by_accessibility_id("scrollview")   
        self.assertIsNotNone(hero)

if __name__ == '__main__':
    suite = unittest.TestLoader().loadTestsFromTestCase(AndroidTests)
    unittest.TextTestRunner(verbosity=2).run(suite)