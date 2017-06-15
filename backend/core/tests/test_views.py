def test_index_route(client):
    response = client.get("/")

    assert response.status_code == 200
    assert response.get('Content-Type') == "text/html; charset=utf-8"
    assert [x.name for x in response.templates] == ["core/index.html"]
    assert response.charset == "utf-8"
