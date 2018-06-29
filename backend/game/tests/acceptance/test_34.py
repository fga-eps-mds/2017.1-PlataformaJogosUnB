# # -*- coding: utf-8 -*-
# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.support.ui import Select
# from selenium.common.exceptions import NoSuchElementException
# from selenium.common.exceptions import NoAlertPresentException
# import unittest, time, re

# class Test34(unittest.TestCase):
#     def setUp(self):
#         self.driver = webdriver.Firefox()
#         self.driver.implicitly_wait(30)
#         self.base_url = "http://127.0.0.1:8000"
#         self.verificationErrors = []
#         self.accept_next_alert = True
    
#     def test_34(self):
#         driver = self.driver
#         driver.get(self.base_url + "/admin/login/?next=/admin/")
#         driver.find_element_by_id("id_username").clear()
#         driver.find_element_by_id("id_username").send_keys("admin")
#         driver.find_element_by_id("id_password").clear()
#         driver.find_element_by_id("id_password").send_keys("qwer1234")
#         driver.find_element_by_css_selector("input.btn.btn-info").click()
#         driver.find_element_by_xpath("(//a[contains(text(),'Adicionar')])[3]").click()
#         driver.find_element_by_id("id_name").clear()
#         driver.find_element_by_id("id_name").send_keys("Wenova")
#         driver.find_element_by_id("id_cover_image").clear()
#         driver.find_element_by_id("id_cover_image").send_keys("/home/mateus/Pictures/Wenova.png")
#         driver.find_element_by_id("id_packages-0-package").clear()
#         driver.find_element_by_id("id_packages-0-package").send_keys("/home/mateus/Pictures/wenova.deb")
#         driver.find_element_by_name("_save").click()
    
#     def is_element_present(self, how, what):
#         try: self.driver.find_element(by=how, value=what)
#         except NoSuchElementException as e: return False
#         return True
    
#     def is_alert_present(self):
#         try: self.driver.switch_to_alert()
#         except NoAlertPresentException as e: return False
#         return True
    
#     def close_alert_and_get_its_text(self):
#         try:
#             alert = self.driver.switch_to_alert()
#             alert_text = alert.text
#             if self.accept_next_alert:
#                 alert.accept()
#             else:
#                 alert.dismiss()
#             return alert_text
#         finally: self.accept_next_alert = True
    
#     def tearDown(self):
#         self.driver.quit()
#         self.assertEqual([], self.verificationErrors)

# if __name__ == "__main__":
#     unittest.main()
