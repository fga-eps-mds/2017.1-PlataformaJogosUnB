# -*- coding: utf-8 -*-
from selenium import selenium
import unittest, time, re

class tc58(unittest.TestCase):
    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", "http://10.10.10.10:3000/")
        self.selenium.start()
    
    def test_tc58(self):
        sel = self.selenium
        sel.open("/admin/auth/user/add/")
        sel.type("id=id_password1", "qwert123")
        sel.type("id=id_password1", "qwert123")
        sel.type("id=id_password2", "qwert123")
        sel.type("id=id_password2", "qwert123")
        sel.click("name=_save")
        sel.click("name=_save")
        sel.wait_for_page_to_load("30000")
    
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
