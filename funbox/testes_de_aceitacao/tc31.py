# -*- coding: utf-8 -*-
from selenium import selenium
import unittest, time, re

class tc31(unittest.TestCase):
    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", "http://10.10.10.10:3000/")
        self.selenium.start()
    
    def test_tc31(self):
        sel = self.selenium
        sel.open("/admin/media/image/add/")
        sel.click("name=_save")
        sel.click("name=_save")
        sel.wait_for_page_to_load("30000")
    
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
